// /* eslint-disable*/
const chooseFile = document.getElementById('chooseFile');
const nameOfUploadFile = document.querySelector('.nameOfUploadFile');
const message = document.querySelector('.message');

chooseFile.addEventListener('change', function setFileName() {
  nameOfUploadFile.innerHTML = chooseFile.value.replace(/.*\\/, '');
});

function viewImage(response) {
  document.querySelector('.image').src = URL.createObjectURL(response);
}

function setMessage(type, text) {
  message.style.display = 'block';
  message.style.opacity = '1';

  switch (type) {
  case 'SUCCES_UPLOAD':
    message.style.background = '#00800094';
    message.style.color = 'white';
    message.innerHTML = text || 'File successfully uploaded.';
    break;

  case 'SUCCES_DOWNLOAD_FILE':
    message.style.background = '#00800094';
    message.style.color = 'white';
    message.innerHTML = text || 'File successfully downloaded.';
    break;

  case 'SUCCES_VIEW_IMAGE':
    message.style.background = '#00800094';
    message.style.color = 'white';
    message.innerHTML = text || 'Image successfully viewed.';
    break;

  case 'CHOOSE_A_FILE':
    message.style.background = '#ffff008f';
    message.style.color = '#000000b8';
    message.innerHTML = text || 'Choose a file, please.';
    break;

  case 'NOT_EXIST':
    message.style.background = '#ffff008f';
    message.style.color = '#000000b8';
    message.innerHTML = text || 'File does not exist or file name is incorrect.';
    break;

  case 'ERROR':
    message.style.background = '#f443366e';
    message.style.color = '#00800094';
    message.innerHTML = text;
    break;

  default:
    break;
  }

  setTimeout(() => {
    message.innerHTML = '';
    message.style.opacity = '0';
  }, 1300);
}

function downloadFile(data, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(data);
  link.download = fileName;
  link.click();
}

