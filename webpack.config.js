const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyledComponentsPlugin = require('babel-plugin-styled-components');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.js?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'lib'),
    port: 8081,
  },
  plugins: [new HtmlWebpackPlugin()],
};