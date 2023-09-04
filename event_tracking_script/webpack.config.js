const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './trackLib.js',  // replace with your actual path
    output: {
        filename: 'trackLib.min.js',
        path: __dirname + '/dist'
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};