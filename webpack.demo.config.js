const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'demo/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, "demo/index.html"),
    filename: "./index.html",
  })]
};