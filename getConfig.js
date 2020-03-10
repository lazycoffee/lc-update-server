#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var currentDir = process.cwd();
// get setting object
var configPath = path_1["default"].join(currentDir, 'us.config.js');
// console.log('config path: ' + configPath);
var setting = require(configPath);
// console.log('config: ' + JSON.stringify(setting));
exports["default"] = setting;
