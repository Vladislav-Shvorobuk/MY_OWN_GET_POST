/* global  nameOfDownloadFile, showMessage, request, onDownloadProgress, viewImage, downLoadProgressBar*/
const IMAGE_MIME_TIPES = ['image/gif', 'image/png', 'image/jpeg',
  'image/bmp', 'image/webp', 'image/vnd.microsoft.icon'];
const image = document.querySelector('.image');
const link = document.createElement('a');

function downloadFile(data, fileName) {
  link.href = URL.createObjectURL(data);
  link.download = fileName;
  link.click();
}

function viewImage(data) {
  image.src = URL.createObjectURL(data);
}

function download(event) {
  event.preventDefault();
  const fileName = nameOfDownloadFile.value;

  if (!fileName) {
    showMessage('CHOOSE_A_FILE');
    return;
  }

  request.get(`/files/${fileName}`, { responseType: 'blob', onDownloadProgress })
    .then(data => {
      if (IMAGE_MIME_TIPES.includes(data.type)) {
        viewImage(data);
        showMessage('SUCCES_VIEW_IMAGE');
      } else {
        downloadFile(data, fileName);
        showMessage('SUCCES_DOWNLOAD_FILE');
      }
    })
    .catch(error => {
      downLoadProgressBar.classList.remove('visible');

      if ((/[404]/).test(error)) {
        showMessage('NOT_EXIST');
        return;
      }

      showMessage('ERROR', `${error}`);
    });
}

