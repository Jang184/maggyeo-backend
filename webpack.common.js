const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const slsw = require("serverless-webpack");

module.exports = {
    entry: slsw.lib.entries,
    output: {
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, ".webpack"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    externals: [nodeExternals()],
    target: "node"
};
