const path = require('path');

module.exports = {
    //   entry: './src/index.js',
    entry: {
        index: './src/index.js',
        encyclopedia: './src/encyclopedia.js',
        armory: './src/armory.js',
        hunt: './src/hunt.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs/javascript'),
    },
    mode: 'production'
};