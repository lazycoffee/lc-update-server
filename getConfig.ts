#! /usr/bin/env node
import path from 'path';
import { Config } from './interface';
let currentDir = process.cwd();
// get setting object
const configPath = path.join(currentDir, 'us.config.js');
// console.log('config path: ' + configPath);
let setting: Config = require(configPath);
// console.log('config: ' + JSON.stringify(setting));
export default setting;