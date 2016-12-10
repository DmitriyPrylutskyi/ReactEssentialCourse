// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var app_root = 'src_lesson31'; // the app root folder: src, src_users, etc
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  app_root: app_root, // the app root folder, needed by the other webpack configs
  entry: [
/*    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',*/
    'babel-polyfill',
    __dirname + '/' + app_root + '/index.js',
  ],
  output: {
    path: __dirname + '/public/js',
    publicPath: 'js/',
    filename: 'bundle.js',
  },
  context: path.join(__dirname, app_root),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.jsx$/,
        loader: "react-hot!babel",
        exclude: [/node_modules/, /public/]
      },
     ],
  },
    plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js', 'img/*'], {
      root: __dirname + '/public',
      verbose: true,
      dry: false, // true for simulation
    }),
    new CopyWebpackPlugin([{
      from: 'img', to: '../img'
    }], {debug: 'info'}),
  ],
};
