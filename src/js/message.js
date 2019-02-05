const message = document.querySelector('.message');
const classes = {
  SUCCES_UPLOAD: 'success',
  SUCCES_DOWNLOAD_FILE: 'success',
  SUCCES_VIEW_IMAGE: 'success',
  CHOOSE_A_FILE: 'info',
  ALREADY_CHOSEN: 'info',
  NOT_EXIST: 'info',
  ERROR: 'error'
};

function setMessage(type, text) {
  switch (type) {
  case 'SUCCES_UPLOAD':
    message.classList.add('success');
    message.innerHTML = text || 'File successfully uploaded.';
    break;

  case 'SUCCES_DOWNLOAD_FILE':
    message.classList.add('success');
    message.innerHTML = text || 'File successfully downloaded.';
    break;

  case 'SUCCES_VIEW_IMAGE':
    message.classList.add('success');
    message.innerHTML = text || 'Image successfully viewed.';
    break;

  case 'CHOOSE_A_FILE':
    message.classList.add('info');
    message.innerHTML = text || 'Choose a file, please.';
    break;

  case 'ALREADY_CHOSEN':
    message.classList.add('info');
    message.innerHTML = text || 'This file was already chosen';
    break;

  case 'NOT_EXIST':
    message.classList.add('info');
    message.innerHTML = text || 'File does not exist or file name is incorrect.';
    break;

  case 'ERROR':
    message.classList.add('error');
    message.innerHTML = text;
    break;

  default:
    break;
  }

  setTimeout(() => message.classList.remove(classes[type]), 1300);
}