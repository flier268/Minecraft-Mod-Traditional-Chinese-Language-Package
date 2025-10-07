# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an automated project that regularly pulls simplified Chinese translations from the [CFPAOrg Minecraft Mod Language Package](https://github.com/CFPAOrg/Minecraft-Mod-Language-Package) repository and converts them to traditional Chinese using a custom `Chinese_cn2tw` converter tool.

## Project Structure

The repository contains three main components:

1. **Minecraft-Mod-Language-Package/** - Git submodule containing the upstream simplified Chinese language pack repository from CFPAOrg
2. **Chinese_cn2tw/** - Node.js-based conversion tool that transforms simplified Chinese (zh_cn) to traditional Chinese (zh_tw)
3. **updatePackerConfig.js** - Script to automatically add "zh_tw" to the targetLanguage list in packer configuration files

## Core Workflow

The intended workflow for this project:

1. Pull the latest changes from the CFPAOrg/Minecraft-Mod-Language-Package repository
2. Run the Chinese_cn2tw converter to transform all zh_cn language files to zh_tw
3. Update packer configuration files to include zh_tw as a target language
4. Package the traditional Chinese resource packs using the upstream packer system

## Commands

### Chinese_cn2tw Converter

```bash
cd Chinese_cn2tw
npm install                    # Install dependencies (cjk-conv, glob, novel-segment)
npm start                      # Run the converter (node index.mjs)
```

The converter processes:
- `../projects/**/zh_cn/**/*.{json,lang}` → zh_tw
- `../projects/**/zh_cn.{json,lang}` → zh_tw
- `../projects/**/zh-cn/**/*.{json,lang}` → zh-tw
- `../projects/**/zh-cn.{json,lang}` → zh-tw

### Packer Configuration Update

```bash
node updatePackerConfig.js     # Add "zh_tw" to all packer config files
```

This updates all JSON files in `Minecraft-Mod-Language-Package/config/packer/` to include "zh_tw" in their targetLanguage arrays.

### Upstream Repository Management

```bash
cd Minecraft-Mod-Language-Package
git pull origin main           # Pull latest changes from upstream
```

## Translation Conversion Details

The Chinese_cn2tw converter uses:
- **cjk-conv**: Chinese character conversion library (cn2tw_min function)
- **novel-segment**: Chinese word segmentation for better conversion quality
- **glob**: File pattern matching for batch processing

The conversion process:
1. Segments Chinese text for proper context
2. Converts simplified characters to traditional using minimum conversion mode
3. Preserves JSON/lang file structure
4. Creates parallel zh_tw directory structure

## Packer System (Upstream)

The upstream packer system configuration is located in `Minecraft-Mod-Language-Package/config/packer/`. Key aspects:

- **Version-specific configs**: Each Minecraft version (1.12.2, 1.16, 1.18, 1.20, 1.21, etc.) has its own JSON config
- **Target languages**: Originally only zh_cn; this project adds zh_tw
- **Packer policies**: Support for direct, indirect, composition, and singleton loading strategies
- **Character replacement**: Handles special characters and unicode sequences
- **Domain inclusion**: Controls which asset domains (font, textures, gui, lang) are included

Refer to `Minecraft-Mod-Language-Package/Packer-Doc.md` for comprehensive packer documentation (in Chinese).

## Version Support

Supported Minecraft versions (as defined in upstream workflow):
- 1.12.2
- 1.16, 1.16-fabric
- 1.18, 1.18-fabric
- 1.19
- 1.20, 1.20-fabric
- 1.21, 1.21-fabric

## Important Notes

- The `Minecraft-Mod-Language-Package` directory should be treated as a git submodule or reference - avoid making direct modifications
- Language file paths use forward slashes (/) as directory separators
- The packer system expects specific directory structures under `projects/<version>/assets/<mod-name>/<namespace>/`
- Character encoding is UTF-8 for all language files
- Special chemical element names and unicode characters have specific replacement mappings in packer configs

## GitHub Actions Automation

### Workflow: auto-update-and-pack.yml

Located at `.github/workflows/auto-update-and-pack.yml`, this workflow automates the entire update, conversion, and packaging process.

**Trigger Conditions:**
- **Schedule**: Daily at UTC 02:00 (Taiwan time 10:00)
- **Manual**: Via GitHub Actions "Run workflow" button
- **Push**: When tools are updated in the `app` branch

**Workflow Jobs:**

1. **update-and-convert** (Ubuntu)
   - Updates Minecraft-Mod-Language-Package submodule
   - Detects changes from upstream
   - Merges conversion tools from `app` branch
   - Runs Chinese_cn2tw converter
   - Updates packer configurations
   - Uploads converted files as artifacts

2. **build-packer** (Windows)
   - Downloads converted files
   - Compiles the .NET packer executable
   - Caches packer for subsequent jobs

3. **pack-resources** (Windows, Matrix Strategy)
   - Runs in parallel for all Minecraft versions
   - Generates resource pack zip files
   - Creates MD5 checksums
   - Uploads artifacts for each version

4. **create-release** (Ubuntu)
   - Collects all packaged resource packs
   - Creates a GitHub Release with timestamp tag
   - Uploads all zip and md5 files as release assets
   - Generates release notes with usage instructions

5. **push-changes** (Ubuntu)
   - Commits converted files back to repository
   - Pushes to master/main branch

### Branch Strategy

- **master/main**: Contains the final converted zh_tw language files
- **app**: Stores the conversion tools (Chinese_cn2tw/ and updatePackerConfig.js)

The workflow merges tools from `app` branch during execution to keep the main branch clean.

### Required GitHub Settings

- **Actions Permissions**: Settings → Actions → General → Workflow permissions → "Read and write permissions"
- **Submodule Configuration**: Minecraft-Mod-Language-Package must be properly configured as a git submodule

### Manual Execution

To manually trigger the workflow:
1. Go to Actions tab in GitHub
2. Select "Auto Update and Pack Traditional Chinese"
3. Click "Run workflow" button
4. Select branch and click "Run workflow"
