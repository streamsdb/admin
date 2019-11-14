const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const api = process.env.API || 'http://localhost:5000'

//app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api',
  proxy({
    ws: true,
    target: api,
    pathRewrite: {'^/api': ''},
    changeOrigin: false,
    logLevel: 'debug',
  })
);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("listening at :" + port);
app.listen(port);
