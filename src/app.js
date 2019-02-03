/* eslint-disable*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const uploadForm = document.getElementById('uploadForm');
const downloadForm = document.getElementById('downloadForm');

//  UPLOAD FILE
uploadForm.addEventListener('submit', event => {
  event.preventDefault();
  const [file] = event.target.sampleFile.files;

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
      uploadProgressBar.classList.remove('visible');
      uploadProgressValue.classList.remove('visible');
      setMessage('ERROR', `${error}`);
    });
});

//  DOWNLOAD FILE
downloadForm.addEventListener('submit', event => {
  event.preventDefault();
  const fileName = nameOfDownloadFile.value;

  if (!fileName) {
    setMessage('CHOOSE_A_FILE');
    return;
  }

  const response = new HttpRequest({ baseUrl: 'http://localhost:8000' });

  response.get(`/files/${fileName}`, { responseType: 'blob', onDownloadProgress })
    .then(data => {
      if (IMAGE_MIME_TIPES.includes(data.type)) {
        viewImage(data);
        setMessage('SUCCES_VIEW_IMAGE');
      } else {
        downloadFile(data, fileName);
        setMessage('SUCCES_DOWNLOAD_FILE');
      }
    })
    .catch(error => {
      downLoadProgressBar.classList.remove('visible');

      if ((/[404]/).test(error)) {
        setMessage('NOT_EXIST');
        return;
      }

      setMessage('ERROR', `${error}`);
    });
});


