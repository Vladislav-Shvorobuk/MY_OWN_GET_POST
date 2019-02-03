/* eslint-disable*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const uploadForm = document.getElementById('uploadForm');
const downloadForm = document.getElementById('downloadForm');

//  UPLOAD FILE
uploadForm.addEventListener('submit',  event => {
  event.preventDefault();
  const [file] = event.target.sampleFile.files;
  console.log(file);
  if (!file) {
    setMessage('CHOOSE_A_FILE');
    return;
  }

  const form = new FormData();
  form.append('sampleFile', file);
  const response = new HttpRequest({ baseUrl: 'http://localhost:8000' });

  response.post('/upload', { data: form, onUploadProgress })
    .then(() => {
      updateList();
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
    .then(data => {
      if (IMAGE_MIME_TIPES.includes(data.type)) {
        viewImage(data);
        setMessage('SUCCES_VIEW_IMAGE');
      } else {
        downloadFile(data, nameOfDownloadFile);
        setMessage('SUCCES_DOWNLOAD_FILE');
      }
    })
    .catch(error => {
      setMessage('NOT_EXIST');
    });
});


