/* eslint-disable*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const uploadForm = document.getElementById('uploadForm');
const downloadForm = document.getElementById('downloadForm');


uploadForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const [file] = e.target.sampleFile.files;

  if (!file) {
    setMessage('CHOOSE_A_FILE');
    return;
  }

  const form = new FormData();
  form.append('sampleFile', file);
  
  const http = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  http.post('/upload', { data: form, onUploadProgress }).then(() => {
    setMessage('SUCCES_DOWNLOAD_FILE');
  }).catch(error => {
    setMessage('ERROR', error);
  });

});


downloadForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const nameOfDownloadFile = document.querySelector('.nameOfDownloadFile').value;

  if (!nameOfDownloadFile) {
    setMessage('CHOOSE_A_FILE');
    return;
  }

  const http = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  
  http.get(`/files/${nameOfDownloadFile}`, { responseType: 'blob', onDownloadProgress })
    .then(data => {
      if (IMAGE_MIME_TIPES.includes(data.response.type)) {
        viewImage(data);
        setMessage('SUCCES_VIEW_IMAGE');
      } else {
        downloadFile(data.response, nameOfDownloadFile);
        setMessage('SUCCES_DOWNLOAD_FILE');
      }
    }).catch(() => {
      setMessage('NOT_EXIST');
    });
});


