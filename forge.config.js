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
      const directory = path.resolve(outputPath, 'resources');
      const files = await fsP.readdir(directory);
      for (const file of files) {
        if (file === 'dist') {
          await fsE.remove(path.join(directory, file, 'forge'));
          await fsE.remove(path.join(directory, file, 'www'));
        } else {
          const filePath = path.join(directory, file);
          await fsE.remove(filePath);
        }
      }
      await fsP.cp(outputPath, path.resolve(__dirname, 'dist/forge'), { recursive: true });
    }
  }
};
