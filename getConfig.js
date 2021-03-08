#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var commandLineArgs = require('command-line-args');
var currentDir = process.cwd();
// 增加命令行选项，支持自定义配置文件名称
var optionDefinitions = [
    {
        name: 'config',
        alias: 'c',
        type: String,
        defaultValue: 'us.config.js',
        defaultOption: true
    },
];
var options = commandLineArgs(optionDefinitions);
// get setting object
var configPath = path_1["default"].join(currentDir, options.config);
// console.log('config path: ' + configPath);
var setting = require(configPath);
// console.log('config: ' + JSON.stringify(setting));
exports["default"] = setting;
