# Spark Keeper

A lightweight, Electron client for the Nomia Market.

## 📥 Download & Install

You can download the latest version from the **[Releases]** page (or your specific download location).

### 🪟 Windows (.exe)
1. Download `spark-keeper-setup.exe` from the latest release.
2. Double-click the file to launch the installer.
3. The app will install and launch automatically.
   > **Note:** If you see a "Windows protected your PC" (SmartScreen) warning, click **More info** -> **Run anyway**. This happens because the app is self-signed.

### 🐧 Linux (.AppImage)
The AppImage format works on most Linux distributions (Ubuntu, Debian, Fedora, Arch, etc.) without installation.

1. Download `spark-keeper.AppImage`.
2. Open your terminal and navigate to the download folder.
3. Make the file executable:
   ```bash
   chmod +x spark-keeper.AppImage
   ```
4. Run the app:
   ```bash
   ./spark-keeper.AppImage

---

## 🛠️ Building from Source

If you prefer to build the application yourself:

### Prerequisites
*   [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
*   npm (usually installs with Node.js)

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/your-username/spark-keeper.git

# Enter the directory
cd spark-keeper

# Install dependencies
npm install
```

### 2. Run in Development Mode
To start the app locally with hot-reloading:
```bash
npm start
```

### 3. Build Distributables
To generate the `.exe` and `.AppImage` files in the `dist/` folder:

```bash
# Build for all platforms (if supported by host)
npm run build

# Or build specifically:
npm run build -- --win   # Windows
npm run build -- --linux # Linux
```

The output files will be located in the `dist/` directory.

---
