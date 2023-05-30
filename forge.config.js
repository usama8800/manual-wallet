/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */
// const fs = require('fs');
const fsP = require('fs/promises');
const fsE = require('fs-extra');
const path = require('path');
const packageJson = require('./package.json');
const os = require('os');
const { exec } = require('child_process');

async function execP(command, options) {
  return new Promise((resolve, reject) => exec(command, options,
    (err, stdout, stderr) => err ? reject(err) : resolve({ stdout, stderr })));
}

async function deleteFiltered(dir, filter) {
  // const fw = fs.createWriteStream('log.txt', { flags: 'a' });
  const dirStack = [dir];
  while (dirStack.length) {
    const _dir = dirStack.pop();
    const files = await fsP.readdir(_dir);
    // fw.write('Directory: ' + _dir + '\n');
    filer: for (const file of files) {
      let repeat = 2;
      while (repeat) {
        try {
          const { action, content } = filter(path.resolve(_dir, file)) ?? { action: 'delete' };
          // fw.write(`${file} ${action}\n`);
          if (action === 'skip') continue filer;
          else if (action === 'into') dirStack.push(path.resolve(_dir, file));
          else if (action === 'delete') await fsE.remove(path.resolve(_dir, file));
          else if (action === 'replace') {
            await fsE.remove(path.resolve(_dir, file));
            await fsE.outputFile(path.resolve(_dir, file), content);
          }
          break;
        } catch (error) {
          repeat--;
        }
      }
    }
  }
  // fw.close();
}

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
      const tmpPath = path.resolve(os.tmpdir(), 'forge');
      await fsE.remove(tmpPath);
      await fsE.move(outputPath, tmpPath);
      await fsE.remove(path.resolve(__dirname, 'out'));

      // Delete old db
      await deleteFiltered(path.resolve(tmpPath, 'resources', 'app', 'prisma'), file => {
        if (['schema.prisma', 'migrations'].includes(path.basename(file))) return { action: 'skip' };
      });
      await execP('npx prisma migrate dev', { cwd: path.resolve(tmpPath, 'resources', 'app') });

      // Delete unused files
      await deleteFiltered(path.resolve(tmpPath, 'resources', 'app'), file => {
        const basename = path.basename(file);
        const parentFolder = path.basename(path.dirname(file));
        if (parentFolder === 'app') {
          if (basename === '.env') return {
            action: 'replace',
            content: 'DATABASE_URL="file:./db.db"',
          };
          if (basename === 'package.json') {
            packageJson.devDependencies = {};
            return {
              action: 'replace',
              content: JSON.stringify(packageJson),
            };
          }
          if (['prisma', 'dist', 'node_modules'].includes(basename)) return { action: 'into' };
        }
        if (parentFolder === 'prisma' && ['db.db'].includes(basename)) return { action: 'skip' };
        // if (basename === 'prisma') return { action: 'skip' };
        if (['dist', 'crypto'].includes(parentFolder)) {
          if (basename.endsWith('.js')) return { action: 'skip' };
          if (['www', 'storage'].includes(basename)) return { action: 'skip' };
          if (basename === 'crypto') return { action: 'into' };
        }
        if (parentFolder === 'node_modules' && basename === '.prisma') return { action: 'skip' };
      });

      const p1 = execP('npm i', { cwd: path.resolve(tmpPath, 'resources', 'app') });
      const p2 = deleteFiltered(path.resolve(tmpPath, 'locales'), file => {
        if (file.endsWith('en-US.pak')) return { action: 'skip' };
      });
      await Promise.all([p1, p2]);
      await fsE.remove(path.resolve(tmpPath, 'resources', 'app', 'package-lock.json'));
      await fsE.move(tmpPath, path.resolve(__dirname, 'dist/forge'));
    }
  }
};
