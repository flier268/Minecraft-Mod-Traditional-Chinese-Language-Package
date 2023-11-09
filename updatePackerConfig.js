const fs = require('fs');

// 讀取 packer.json 文件
const packerConfig = JSON.parse(fs.readFileSync('config/packer.json', 'utf8'));

// 修改每個配置對象，添加 "zh_tw" 到 targetLanguage 數組
packerConfig.forEach(config => {
  if (!config.targetLanguage.includes("zh_tw")) {
    config.targetLanguage.push("zh_tw");
  }
});

// 將更新後的配置寫回 packer.json 文件
fs.writeFileSync('config/packer.json', JSON.stringify(packerConfig, null, 2), 'utf8');
