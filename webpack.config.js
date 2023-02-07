const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.jsx',
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html'),
      template: path.resolve(__dirname, './client/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    historyApiFallback: true,

    static: {
      directory: path.resolve(__dirname, 'build'),
    },

    // headers: { 'Access-Control-Allow-Origin': '*' },
    // proxy: {
    //   '/api/**': {
    //     target: 'http://localhost:3000/',
    //     secure: false,
    //   },
    // },
  },
    // proxy: {
    //   '/api/**': {
    //     target: 'http://localhost:3000/',
    //     secure: false,
    //   },
    // },
  },
};
