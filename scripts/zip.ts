import archiver from 'archiver';
import async from 'async';
import { exec } from 'child_process';
import fs from 'fs-extra';
import packageJson from '../package.json';

const zipFileName = `${packageJson.name}-${packageJson.version}.zip`;

async function main() {
  await fs.remove(zipFileName);
  await fs.emptyDir('dist');

  const zip = fs.createWriteStream(zipFileName);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(zip);

  async.auto({
    buildReact: (cb: async.AsyncResultCallback<any, Error>) => {
      exec('npm run react:build', (error) => {
        if (error) return cb(error);
        console.log('Built react');
        cb();
      });
    },
    buildElectron: ['buildReact', (_: any, cb: async.AsyncResultCallback<any, Error>) => {
      exec('npm run forge:package', (error) => {
        if (error) return cb(error);
        console.log('Built electron');
        cb();
      });
    }],
    copyElectron: ['buildElectron', (_: any, cb: async.AsyncResultCallback<any, Error>) => {
      setImmediate(() => {
        archive.directory('dist/forge', false);
        cb();
      });
    }],
  }, async (err) => {
    if (err) return console.log(err);
    await archive.finalize();
  });
}

main();
