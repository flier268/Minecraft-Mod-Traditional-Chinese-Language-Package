# Minecraft 模組繁體中文語言包

[![Auto Update](https://github.com/flier268/Minecraft-Mod-Traditional-Chinese-Language-Package/actions/workflows/auto-update-and-pack.yml/badge.svg)](https://github.com/flier268/Minecraft-Mod-Traditional-Chinese-Language-Package/actions/workflows/auto-update-and-pack.yml)
[![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-blue.svg)](LICENSE)

> 自動從 [CFPAOrg/Minecraft-Mod-Language-Package](https://github.com/CFPAOrg/Minecraft-Mod-Language-Package) 拉取簡體中文翻譯，並轉換為繁體中文的自動化專案。

## 📦 功能特色

- 🔄 **自動更新**：每日自動從上游倉庫拉取最新翻譯
- 🈳 **智慧轉換**：使用 novel-segment 進行中文分詞，確保轉換品質
- 📚 **多版本支援**：支援 Minecraft 1.12.2 至 1.21 的 Forge 和 Fabric 版本
- 🤖 **全自動打包**：GitHub Actions 自動化建置和發布語言包
- 📥 **即開即用**：下載後直接放入 resourcepacks 資料夾即可使用

## 🚀 快速開始

### 使用者

#### 方式一：下載語言包（推薦）

1. 前往 [Releases](../../releases) 頁面
2. 下載對應你的 Minecraft 版本的 zip 檔案
3. 將 zip 檔案放入 Minecraft 的 `resourcepacks` 資料夾
4. 在遊戲中啟用該資源包

#### 方式二：使用自動漢化更新模組

安裝 [自動漢化更新](https://github.com/WingChunWong/I18nUpdateMod3/tree/zh_hant) 模組，可自動下載並應用最新的繁體中文翻譯。

### 開發者

#### 本地運行


1. 克隆倉庫（包含子模組）

```shell
git clone --recurse-submodules https://github.com/flier268/Minecraft-Mod-Traditional-Chinese-Language-Package.git
cd Minecraft-Mod-Traditional-Chinese-Language-Package
```

3. 更新子模組到最新版本

```shell
cd Minecraft-Mod-Language-Package
git checkout main
git pull origin main
cd ..
```

5. 安裝依賴

```shell
cd Chinese_cn2tw
npm install
cd ..
```

6. 執行轉換

```shell
cd Chinese_cn2tw
npm start
cd ..
```

7. 更新打包配置

```shell
node updatePackerConfig.js
```

#### 手動觸發更新

前往 [Actions](../../actions/workflows/auto-update-and-pack.yml) 頁面，點擊 "Run workflow" 按鈕手動觸發更新。

## 📁 專案結構

```
.
├── .github/
│   └── workflows/
│       └── auto-update-and-pack.yml    # GitHub Actions 工作流
├── Chinese_cn2tw/                       # 簡繁轉換工具
│   ├── index.mjs                        # 主程式
│   └── package.json                     # 依賴管理
├── Minecraft-Mod-Language-Package/      # 上游簡體中文倉庫（子模組）
├── updatePackerConfig.js                # 打包配置更新腳本
├── CLAUDE.md                            # Claude Code 專案說明
└── README.md                            # 本檔案
```

## 🔧 技術細節

### 轉換工具

使用三個核心 npm 套件：

- **cjk-conv**：中文字符轉換庫（cn2tw_min 函數）
- **novel-segment**：中文分詞工具，提升轉換品質
- **glob**：批次檔案處理

### 轉換流程

1. 使用 novel-segment 對簡體中文文本進行分詞
2. 通過 cjk-conv 的最小轉換模式將簡體字轉換為繁體字
3. 保留原始 JSON/lang 檔案結構
4. 建立對應的 zh_tw 目錄結構

### 支援的檔案格式

- `projects/**/zh_cn/**/*.{json,lang}` → `zh_tw`
- `projects/**/zh_cn.{json,lang}` → `zh_tw`
- `projects/**/zh-cn/**/*.{json,lang}` → `zh-tw`
- `projects/**/zh-cn.{json,lang}` → `zh-tw`

## 📅 自動化時程

- **排程更新**：每日 UTC 02:00（台北時間 10:00）
- **自動檢測**：僅在上游有更新時執行轉換和打包
- **發布週期**：檢測到更新後自動建立 Release

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

### 開發分支說明

- `master`/`main`：主分支，包含自動生成的繁體中文翻譯
- `app`：工具分支，存放轉換工具和配置腳本

## 📄 授權

- 本專案的轉換工具採用 LGPL-3.0 授權
- 翻譯內容遵循上游 [CFPAOrg/Minecraft-Mod-Language-Package](https://github.com/CFPAOrg/Minecraft-Mod-Language-Package) 的 CC BY-NC-SA 4.0 授權

## 🙏 致謝

- [CFPAOrg](https://github.com/CFPAOrg) - 提供優質的簡體中文翻譯
- [cjk-conv](https://github.com/Tsutomu-Ikeda/cjk-conv) - 中文轉換庫
- [novel-segment](https://github.com/bluelovers/novel-segment) - 中文分詞工具
- 所有參與翻譯和改進的貢獻者

## 📊 專案狀態

![GitHub last commit](https://img.shields.io/github/last-commit/flier268/Minecraft-Mod-Traditional-Chinese-Language-Package)
![GitHub release](https://img.shields.io/github/v/release/flier268/Minecraft-Mod-Traditional-Chinese-Language-Package)
![GitHub downloads](https://img.shields.io/github/downloads/flier268/Minecraft-Mod-Traditional-Chinese-Language-Package/total)

---

💡 如有問題或建議，歡迎在 [Issues](../../issues) 頁面提出。

