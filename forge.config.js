/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */
const fsP = require('fs/promises');
const fsE = require('fs-extra');
const path = require('path');

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
      await fsE.remove(path.resolve(__dirname, '../dist/electron'));
    },
    postPackage: async (forgeConfig, options) => {
      const outputPath = options.outputPaths[0];
      await fsP.cp(outputPath, path.resolve(__dirname, '../dist/electron'), { recursive: true });
    }
  }
};
