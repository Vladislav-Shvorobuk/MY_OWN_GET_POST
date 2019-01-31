/* eslint-disable*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const uploadForm = document.getElementById('uploadForm');
const downloadForm = document.getElementById('downloadForm');


uploadForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const [file] = e.target.sampleFile.files;

  if (!file) {
    setMessage('.UploadMes', 'Choose a file.');
    return;
  }

  const form = new FormData();
  form.append('sampleFile', file);
  
  const http = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  http.post('/upload', { data: form, onUploadProgress });
});


downloadForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const nameOfDownloadFile = document.querySelector('.nameOfDownloadFile').value;

  if (!nameOfDownloadFile) {
    setMessage('.DownloadMes', 'Choose a file.');
    return;
  }

  const http = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  
  http.get(`/files/${nameOfDownloadFile}`, { responseType: 'blob', onDownloadProgress })
    .then(data => {
      if (IMAGE_MIME_TIPES.includes(data.response.type)) {
        viewImage(data);
      } else {
        downloadFile(data.response, nameOfDownloadFile);
      }
    }).catch(() => {
      setMessage('.DownloadMes', 'File does not exist or file name is incorrect.');
    });
});


