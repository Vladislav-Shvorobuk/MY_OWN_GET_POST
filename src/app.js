/* eslint-disable*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const uploadForm = document.getElementById('uploadForm');
const downloadForm = document.getElementById('downloadForm');

//  UPLOAD FILE
uploadForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const [file] = e.target.sampleFile.files;

  if (!file) {
    setMessage('CHOOSE_A_FILE');
    return;
  }

  const form = new FormData();
  form.append('sampleFile', file);
  const response = new HttpRequest({ baseUrl: 'http://localhost:8000' });

  response.post('/upload', { data: form, onUploadProgress })
    .then(() => {
      setMessage('SUCCES_DOWNLOAD_FILE');
    })
    .catch(error => {
      setMessage('ERROR', error);
    });
});

//  DOWNLOAD FILE
downloadForm.addEventListener('submit', event => {
  event.preventDefault();
  const nameOfDownloadFile = document.querySelector('.nameOfDownloadFile').value;

  if (!nameOfDownloadFile) {
    setMessage('CHOOSE_A_FILE');
    return;
  }

  const response = new HttpRequest({ baseUrl: 'http://localhost:8000' });

  response.get(`/files/${nameOfDownloadFile}`, { responseType: 'blob', onDownloadProgress })
    .then(response => {
      if (IMAGE_MIME_TIPES.includes(response.type)) {
        viewImage(response);
        setMessage('SUCCES_VIEW_IMAGE');
      } else {
        downloadFile(response, nameOfDownloadFile);
        setMessage('SUCCES_DOWNLOAD_FILE');
      }
    })
    .catch(error => {
      console.log(error);
      setMessage('NOT_EXIST');
    });
});


