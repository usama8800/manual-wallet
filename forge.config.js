/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */
const fsP = require('fs/promises');
const fsE = require('fs-extra');
const path = require('path');
const { writeFileSync } = require('fs');

module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  hooks: {
    prePackage: async () => {
      await fsE.remove(path.resolve(__dirname, 'dist/forge'));
    },
    postPackage: async (forgeConfig, options) => {
      const outputPath = options.outputPaths[0];
      const files = fs.readdirSync(directory);

      // Exclude the specified file
      const filteredFiles = files.filter(file => file !== excludedFile);

      // Remove all files and folders in the directory
      for (const file of filteredFiles) {
        const filePath = path.join(directory, file);

        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmdirSync(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      }
      await fsP.cp(outputPath, path.resolve(__dirname, 'dist/forge'), { recursive: true });
    }
  }
};
