const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/, //testing anything that ends in .js or .jsx
        exclude: /(node_modules)/, //are excluding the folder that hold the node modules dependencies. Put () around node_modules
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
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    // historyApiFallback: true,

    static: {
      // match the output path
      directory: './index.html',
      // match the output 'publicPath'
      publicPath: '/',
    },

    // headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  // proxy: {
  //   '/api/**': {
  //     target: 'http://localhost:3000/',
  //     secure: false,
  //   },
  // },
};
