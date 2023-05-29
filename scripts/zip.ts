import archiver from 'archiver';
import { exec } from 'child_process';
import fs from 'fs-extra';
import { resolve } from 'path';
import packageJson from '../package.json';

const zipFileName = `${packageJson.name}-${packageJson.version}.zip`;

async function main() {
  await fs.remove(zipFileName);
  await fs.emptyDir('dist');

  const zip = fs.createWriteStream(zipFileName);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(zip);

  archive.file('package.json', { name: 'user/mods/EntryPointSelector/package.json' });
  archive.file('LICENSE', { name: 'user/mods/EntryPointSelector/LICENSE' });
  archive.file('README.md', { name: 'user/mods/EntryPointSelector/README.md' });
  archive.directory('data', 'user/mods/EntryPointSelector/data');

  async.auto({
    buildMod: (cb: async.AsyncResultCallback<any, Error>) => {
      exec('npm run build', () => {
        console.log('Built mod');
        cb();
      });
    },
    copyMod: ['buildMod', (_: any, cb: async.AsyncResultCallback<any, Error>) => {
      setImmediate(() => {
        archive.directory('dist/src', 'user/mods/EntryPointSelector/src');
        cb();
      });
    }],
    buildElectron: (cb: async.AsyncResultCallback<any, Error>) => {
      exec('npm run package', { cwd: 'electron' }, () => {
        console.log('Built electron');
        cb();
      });
    },
    copyElectron: ['buildElectron', (_: any, cb: async.AsyncResultCallback<any, Error>) => {
      setImmediate(() => {
        archive.directory('client', 'user/mods/EntryPointSelector/client');
        cb();
      });
    }],
    buildBepInEx: (cb: async.AsyncResultCallback<any, Error>) => {
      exec('dotnet build', { cwd: 'BepInEx' }, () => {
        console.log('Built BepInEx');
        cb();
      });
    },
    copyBepInEx: ['buildBepInEx', (_: any, cb: async.AsyncResultCallback<any, Error>) => {
      setImmediate(() => {
        archive.file(resolve('BepInEx', 'obj', 'Debug', 'net472', 'EntryPointSelector.dll'), { name: 'BepInEx/plugins/EntryPointSelector.dll' });
        cb();
      });
    }],
  }, async () => {
    await archive.finalize();
  });
}

main();
