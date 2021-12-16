const PeerDepsExternalsPlugin = require("@bigbinary/peer-deps-externals-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: "./src/components/index.js",
  },
  plugins: [new PeerDepsExternalsPlugin(), new BundleAnalyzerPlugin()],

  module: {
    rules: [
      {
        test: /\.md$/i,
        use: "raw-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "babel-loader",
          },
        ],
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
    publicPath: "",
    path: __dirname + "/dist",
    filename: "index.js",
    library: "neeto-team-member",
    libraryTarget: "umd",
  },
};
