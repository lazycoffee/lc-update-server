#! /usr/bin/env node
import path from 'path';
import fs from 'fs-extra';
import upload from './upload';
import exec from './exec';
import config from './getConfig';

(async function () {
    const cwd = process.cwd();
    const sshOption = config.server;
    if (!sshOption) {
        console.log('not valid config');
        return;
    }
    const rootPath = path.join(cwd);
    console.log(config);
    const targetPath = path.join(rootPath, config.upload.localPath);
    let zipPath;
    fs.readdirSync(targetPath).forEach((each: string) => {
        if (config.upload.fileRex.test(each)) {
            zipPath = path.join(targetPath, each);
        }
    });
    if (!zipPath) {
        throw new Error('no zip file');
    }
    const zipFileName = path.basename(zipPath);
    const remotePath = config.upload.remotePath;
    const uploadRes = await upload(sshOption, zipPath, remotePath);
    if (uploadRes) {
        if (!zipFileName) {
            throw new Error('You have to provide zip file name.');
        }
        if (/[\/\\]/.test(zipFileName)) {
            throw new Error('For security reason, you can not use "/" or "" in zip file name.');
        }
        const remoteZipPath = path.join(remotePath, zipFileName);
        const remoteResource = path.join(remotePath, config.upload.cleanPath);
        exec(sshOption, [
            `cd ${remotePath}`,
            'pwd',
            `rm -rf ${remoteResource}`,
            `unzip -o ${remoteZipPath} -d ${remotePath}`,
            `rm ${remoteZipPath}`,
        ]);
    }
}());
