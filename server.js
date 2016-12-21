const express = require('express');
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

// http://expressjs.com/en/4x/api.html
const app = express();
const port = process.env.PORT || 3000;
const app_root = config.app_root
const index_path = __dirname + '/' + app_root + '/index.html';

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath  }))
app.use(webpackHotMiddleware(compiler))

app.get('*', function (request, response) {
  response.sendFile(index_path, function (error) {
    if (error) {
      console.log(error);
    }
  });
});
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.log("Listening at http://localhost:" + port)
  }
})
