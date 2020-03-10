# lc-update-server
A package simplify your update server routine job.

## Update process
1.  

## Usage
Create a config file: us.config.js in your project root directory.<br>
The content will look like this: 
```js
const config = {
    server: {
        host: '172.16.176.81',
        port: 22, // default 22
        username: 'test',
        // It will store it in plain text.
        // You have to make sure this security.
        password: 'webtestold',
    },
    upload: {
        // Will find the package in this directory
        localPath: './target/',
        // Will find the first match file
        fileRex: /^cc-image-news.*\.zip$/,
        // This directory will be cleaned before upload package.
        // You can input a relate path with remotePath.
        // If you leave this empty, nothing will be cleaned
        cleanPath: './resources/cc/h5/cc-image-news/',
        // The package will put in this directory
        remotePath: '/data/goldencoinstatic/',
    }
};
module.exports = config;
```