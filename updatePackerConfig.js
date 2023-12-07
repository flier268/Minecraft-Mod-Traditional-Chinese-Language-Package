const fs = require('fs');
const path = require('path');

// 指定目錄
const directoryPath = path.join(__dirname, 'config', 'packer');

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
      if (!packerConfig.targetLanguage.includes("zh_tw")) {
        packerConfig.targetLanguage.push("zh_tw");
      }

      // 寫回文件
      fs.writeFileSync(filePath, JSON.stringify(packerConfig, null, 2), 'utf8');
    }
  });
});
