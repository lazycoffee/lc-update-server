"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var domain_1 = __importDefault(require("domain"));
var ssh2_1 = __importDefault(require("ssh2"));
var Connection = ssh2_1["default"].Client;
function uploadToSftpServer(options, localPath, remotePath) {
    if (!localPath) {
        throw new Error('You have to provide local file path.');
    }
    if (!remotePath) {
        throw new Error('You have to provide remote directory path.');
    }
    return new Promise(function (resolve) {
        var realRemotePath = remotePath;
        if (!path_1["default"].extname(remotePath)) {
            realRemotePath = path_1["default"].join(remotePath, path_1["default"].basename(localPath));
        }
        var connection = new Connection(), handler = domain_1["default"].create();
        handler.on("error", function (error) {
            console.error("Error occurred: %s", error);
            process.exit(-1);
        });
        // Handling "error" event inside domain handler.
        handler.add(connection);
        connection.on("ready", function () {
            connection.sftp(handler.intercept(function (sftp) {
                sftp.fastPut(localPath, realRemotePath, handler.intercept(connection.end.bind(connection)));
            }));
        });
        connection.on("end", function () {
            console.log("upload finished: " + localPath + "->" + realRemotePath);
            resolve(true);
        });
        connection.connect(options);
    });
}
exports["default"] = uploadToSftpServer;
