const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/api',
  proxy({
    target: process.env.API || 'http://localhost:5000',
    changeOrigin: true,
  })
);

let port = process.env.PORT || 9000;

console.log("listening at :" + port);
app.listen(port);
