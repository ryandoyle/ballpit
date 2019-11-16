const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'dist' );
// https://github.com/juristr/webpack-typescript-starter/blob/master/webpack.config.js
module.exports = {
    context: ROOT,
    mode: "development",
    devtool: "inline-source-map",
    entry: "./index.ts",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    devServer: {
        proxy: {
            '/api': 'http://localhost:9090'
        }
    }
};
