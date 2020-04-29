'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const upload = multer().single('upfile');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload, (req, res) => {
  if (req.file) {
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({
      name,
      type,
      size
    });
  } else {
    res.json({
      errror: 'no file selected'
    });
  }
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
