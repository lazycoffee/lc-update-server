#! /usr/bin/env node
import path from 'path';
import { Config } from './interface';
const commandLineArgs = require('command-line-args');
let currentDir = process.cwd();

// 增加命令行选项，支持自定义配置文件名称
const optionDefinitions = [
    {
        name: 'config',
        alias: 'c',
        type: String,
        defaultValue: 'us.config.js',
        defaultOption: true,
    },
];
const options = commandLineArgs(optionDefinitions);
// get setting object
const configPath = path.join(currentDir, options.config);
// console.log('config path: ' + configPath);
let setting: Config = require(configPath);
// console.log('config: ' + JSON.stringify(setting));
export default setting;
