# lc-update-server
A package simplify your update server routine job.

## Update process
1. Clean remote resource directory.
2. Upload zip package into remote server.
3. Unzip package.

## Usage
Create a config file: us.config.js in your project root directory.<br>
The content will look like this: 
```js
const config = {
    server: {
        host: '127.0.0.1',
        port: 22, // default 22
        username: 'test',
        // It will store it in plain text.
        // You have to make sure this security.
        password: 'password',
    },
    upload: {
        // Will find the package in this directory
        localPath: './target/',
        // Will find the first match file
        fileRex: /^cc-image-news.*\.zip$/,
        // This directory will be cleaned before upload package.
        // You can input a relate path with remotePath.
        // If you leave this empty, nothing will be cleaned
        cleanPath: './resources/cc-image-news/',
        // The package will put in this directory
        remotePath: '/data/',
    }
};
module.exports = config;
```

## LICENSE
MIT. See LICENSE for more detail.