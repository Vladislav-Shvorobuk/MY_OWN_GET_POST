/* eslint-disable*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const myfile = document.getElementById('myfile');
const buttonShow = document.querySelector('.buttonShow');
const list = document.querySelector('.list');
const close = document.querySelector('.fas');


document.getElementById('uploadForm').onsubmit = function (e) {
  e.preventDefault();
  const form = new FormData();
  const http = new HttpRequest();
  const file = e.target.sampleFile.files[0];

  if (!file) {
    setMessage('.UploadMes', 'Choose a file.');
    return;
  }
  form.append('sampleFile', file);
  http.post('http://localhost:8000/upload', { data: form, onUploadProgress });
};


document.getElementById('downloadForm').onsubmit = function (e) {
  e.preventDefault();
  const fileName = document.body.querySelector('#fileName').value;

  if (!fileName) {
    setMessage('.DownloadMes', 'Choose a file.');
    return;
  }
  
  const http = new HttpRequest('/files/');
  http.get(`${fileName}`, { responseType: 'blob', onDownloadProgress })
    .then(data => {
      if (IMAGE_MIME_TIPES.includes(data.response.type)) {
        viewImage(data);
      } else {
        downloadFile(data.response);
      }
    });
};


myfile.onchange = function setFileName() {
  const fileName = document.querySelector('.fileName');
  const arr = myfile.value.split('\\');
  fileName.innerHTML = arr[arr.length - 1];
};


buttonShow.onclick = function showList() {
  buttonShow.style.display = 'none';

  list.style.display = 'block';
  const http = new HttpRequest();
  http.get(`/list`, {})
    .then(data => {
      data.response.forEach((file, index) => {
              const p = document.createElement('p');
              list.appendChild(p);
              p.innerHTML = (index + 1) + ")  " + file;
      });
    });
}

close.onclick = function closeList() {
  buttonShow.style.display = 'block';
  list.style.display = 'none';
  const content = list.getElementsByTagName('p');
  for(let i = content.length - 1; i >= 0; i--){
    list.removeChild(content[i]);
  }
}