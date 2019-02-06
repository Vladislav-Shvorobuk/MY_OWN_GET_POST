const message = document.querySelector('.message');
const types = {
  SUCCES_UPLOAD: {
    class: 'success',
    text: 'File successfully uploaded.'
  },
  SUCCES_DOWNLOAD_FILE: {
    class: 'success',
    text: 'File successfully downloaded.'
  },
  SUCCES_VIEW_IMAGE: {
    class: 'success',
    text: 'Image successfully viewed.'
  },
  CHOOSE_A_FILE: {
    class: 'info',
    text: 'Choose a file, please.'
  },
  ALREADY_CHOSEN: {
    class: 'info',
    text: 'This file was already chosen'
  },
  NOT_EXIST: {
    class: 'info',
    text: 'File does not exist or file name is incorrect.'
  },
  ERROR: {
    class: 'error',
    text: 'Ooops, something went wrong'
  }
};

function showMessage(type, text) {
  message.classList.add(types[type].class);
  message.innerHTML = text || types[type].text;

  setTimeout(() => message.classList.remove(types[type].class), 1300);
}