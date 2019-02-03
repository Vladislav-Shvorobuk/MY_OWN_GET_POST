const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');

app.use('/favicon', express.static(`${__dirname}/public/images/favicon.png`));
app.use('/background', express.static(`${__dirname}/public/images/background.jpg`));
app.use('/style', express.static(`${__dirname}/src/css/style.css`));
app.use('/form', express.static(`${__dirname}/index.html`));
app.use('/app.js', express.static(`${__dirname}/src/app.js`));
app.use('/utils.js', express.static(`${__dirname}/src/js/utils.js`));
app.use('/listOfFiles.js', express.static(`${__dirname}/src/js/listOfFiles.js`));
app.use('/message.js', express.static(`${__dirname}/src/js/message.js`));
app.use('/progress.js', express.static(`${__dirname}/src/js/progress.js`));
app.use('/HttpRequest.js', express.static(`${__dirname}/src/js/HttpRequest.js`));
app.use('/files', express.static(`${__dirname}/uploads`));
app.use('/list', express.static(`${__dirname}/uploads`));


// fs
app.get('/list', function(req, res) {
  fs.readdir(`${__dirname}/uploads`, function(err, data) {
    res.send(data);
  });
});

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = `${__dirname}/uploads/${sampleFile.name}`;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(`File uploaded to ${uploadPath}`);
  });
});

app.listen(8000, function() {
  console.log('Express server listening on port 8000'); // eslint-disable-line
});