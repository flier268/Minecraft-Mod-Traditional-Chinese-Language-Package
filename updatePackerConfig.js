const fs = require('fs');
const path = require('path');

// 指定目錄
const directoryPath = path.join(__dirname, 'Minecraft-Mod-Language-Package', 'config', 'packer');

// 讀取指定目錄下的所有文件
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('無法讀取目錄：', err);
    return;
  }

  files.forEach(file => {
    // 確保只處理 .json 文件
    if (path.extname(file) === '.json') {
      const filePath = path.join(directoryPath, file);
      // 讀取 JSON 文件
      const packerConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // 檢查並添加 "zh_tw"
      if (packerConfig.base && packerConfig.base.targetLanguages) {
        if (!packerConfig.base.targetLanguages.includes("zh_tw")) {
          packerConfig.base.targetLanguages.push("zh_tw");
          console.log(`已更新 ${file}: 添加 zh_tw`);
        } else {
          console.log(`${file}: zh_tw 已存在`);
        }

        // 寫回文件
        fs.writeFileSync(filePath, JSON.stringify(packerConfig, null, 2), 'utf8');
      } else {
        console.log(`${file}: 找不到 base.targetLanguages 欄位`);
      }
    }
  });
});
