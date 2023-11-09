import {  cn2tw_min } from "cjk-conv/lib/zh/convert/min.js";
import { glob } from "glob";
import { promises as fs } from "fs";
import path from "path";
import Segment from "novel-segment";

var segment = new Segment({
  autoCjk: true,
  optionsDoSegment: {
    convertSynonym: true,
  },
  nodeNovelMode: true,
  all_mod: true,
});

//segment.loadDict('dict.txt'); // 载入字典，详见dicts目录，或者是自定义字典文件的绝对路径
//segment.useDefault({all_mod:true});
segment.useDefault();
// 开始分词
var convert = (str) => {
  return cn2tw_min(segment.doSegment(str, { simple: true }).join(""));
};

async function convertFiles(pattern, searchValue, replaceValue) {
  try {
    const files = await glob(pattern);
    for (const file of files) {
      const cn = await fs.readFile(file, "utf8");
      const tw = convert(cn);
      const filename_new = file.replace(searchValue, replaceValue);
      await fs.mkdir(path.dirname(filename_new), { recursive: true });
      await fs.writeFile(filename_new, tw);
      console.log(`Add file ${filename_new}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

await Promise.all([
  convertFiles("../projects/**/zh_cn/**/*.{json,lang}", "zh_cn", "zh_tw"),
  convertFiles("../projects/**/zh_cn.{json,lang}", "zh_cn", "zh_tw"),
  convertFiles("../projects/**/zh-cn/**/*.{json,lang}", "zh-cn", "zh-tw"),
  convertFiles("../projects/**/zh-cn.{json,lang}", "zh-cn", "zh-tw"),
]).then(() => {
  console.log("All conversions completed!");
});
console.log("Done");
