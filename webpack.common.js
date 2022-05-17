const path = require("path");
const nodeExternals = require("webpack-node-externals");
const slsw = require("serverless-webpack");

module.exports = {
    entry: slsw.lib.entries,
    output: {
        libraryTarget: "commonjs",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            }
        ]
    },
    target: "node"
};
