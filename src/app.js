/* eslint-disable*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const chooseFile = document.getElementById('chooseFile');
const buttonShow = document.querySelector('.buttonShow');
const listOfFiles = document.querySelector('.listOfFiles');
const buttonClose = document.querySelector('.fa-times');



document.getElementById('uploadForm').onsubmit = function (e) {
  e.preventDefault();
  const form = new FormData();
  const http = new HttpRequest({ baseUrl: 'http://localhost:8000'});
  const [file] = e.target.sampleFile.files;

  if (!file) {
    setMessage('.UploadMes', 'Choose a file.');
    return;
  }
  form.append('sampleFile', file);
  http.post('/upload', { data: form, onUploadProgress });
};


document.querySelector('#downloadForm').onsubmit = function (e) {
  e.preventDefault();
  const fileName = document.querySelector('.nameOfDownloadFile').value;

  if (!fileName) {
    setMessage('.DownloadMes', 'Choose a file.');
    return;
  }
  
  const http = new HttpRequest({ baseUrl: 'http://localhost:8000'});
  http.get(`/files/${fileName}`, { responseType: 'blob', onDownloadProgress })
    .then(data => {
      if (IMAGE_MIME_TIPES.includes(data.response.type)) {
        viewImage(data);
      } else {
        downloadFile(data.response, fileName);
      }
    }).catch(() => {
      setMessage('.DownloadMes', 'File does not exist or file name is incorrect.');
    });
};


chooseFile.onchange = function setFileName() {
  const fileName = document.querySelector('.nameOfUploadFile');
  const arr = chooseFile.value.split('\\');
  fileName.innerHTML = arr[arr.length - 1];
};


buttonShow.onclick = function showList() {
  buttonShow.style.display = 'none';

  listOfFiles.style.display = 'block';
  const http = new HttpRequest({ baseUrl: 'http://localhost:8000'});
  http.get('/list')
    .then(data => {
      data.response.forEach((file, index) => {
              const p = document.createElement('p');
              listOfFiles.appendChild(p);
              p.innerHTML = (index + 1) + ")  " + file;
      });
    });
}

buttonClose.onclick = function closeList() {
  buttonShow.style.display = 'block';
  listOfFiles.style.display = 'none';
  const content = listOfFiles.getElementsByTagName('p');
  for(let i = content.length - 1; i >= 0; i--){
    listOfFiles.removeChild(content[i]);
  }
}