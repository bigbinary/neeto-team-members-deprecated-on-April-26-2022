const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");
const path = require("path");

module.exports = [
  {
    entry: "./index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    output: {
      path: __dirname + "/dist",
      filename: "index.js",
      library: "neeto-team-members",
      libraryTarget: "umd",
    },
    plugins: [new PeerDepsExternalsPlugin()],
  },
];
