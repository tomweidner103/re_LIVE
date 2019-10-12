"use strict";

const path = require('path')
module.exports = {
  entry: ["babel-polyfill", "./client/index"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.resolve(__dirname, "./client"),
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }};
