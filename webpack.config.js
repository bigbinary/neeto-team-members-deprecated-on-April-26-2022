const path = require("path");

module.exports = {
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
  externals: {
    "@bigbinary/neetoui/v2": "@bigbinary/neetoui/v2",
    "@bigbinary/neetoui/v2/formik": "@bigbinary/neetoui/v2/formik",
    "@bigbinary/neetoui/v2/layouts": "@bigbinary/neetoui/v2/layouts",
    "@bigbinary/neeto-icons": "@bigbinary/neeto-icons",
    axios: "axios",
    classnames: "classnames",
    formik: "formik",
    ramda: "ramda",
    react: "react",
    "react-dom": "react-dom",
    "react-toastify": "react-toastify",
    yup: "yup",
  },
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    library: "neeto-team-members",
    libraryTarget: "umd",
  },
};
