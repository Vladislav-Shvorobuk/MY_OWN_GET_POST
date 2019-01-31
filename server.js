const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');

app.use('/favicon', express.static(__dirname + '/resources/images/favicon.png'));
app.use('/back_2', express.static(__dirname + '/resources/images/back_2.jpg'));
app.use('/style', express.static(__dirname + '/src/style.css'));
app.use('/form', express.static(__dirname + '/index.html'));
app.use('/app.js', express.static(__dirname + '/src/app.js'));
app.use('/progress.js', express.static(__dirname + '/src/progress.js'));
app.use('/HttpRequest.js', express.static(__dirname + '/src/HttpRequest.js'));
app.use('/files', express.static(__dirname + '/uploads'));
app.use('/list', express.static(__dirname + '/uploads'));


// fs
app.get('/list', function (req, res) {
  fs.readdir(__dirname + '/uploads', function (err, files) {
    res.send(files);
  });
});

// default options
app.use(fileUpload());

app.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

app.listen(8000, function () {
  console.log('Express server listening on port 8000'); // eslint-disable-line
});