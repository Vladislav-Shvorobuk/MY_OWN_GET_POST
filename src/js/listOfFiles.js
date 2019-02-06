/* global request, showMessage*/
const buttonShow = document.querySelector('.buttonShow');
const buttonClose = document.querySelector('.fa-times');
const containerForList = document.querySelector('.containerForList');
const listOfFiles = document.querySelector('.listOfFiles');
const nameOfDownloadFile = document.querySelector('.nameOfDownloadFile');

function render(data) {
  const html = data.reduce((accumulator, file, index) => `${accumulator}<p><a>${index + 1})  ${file}</a></p>\n`, '');
  listOfFiles.innerHTML = html;
}

function updateList() {
  request.get('/list')
    .then(data => {
      render(data);
    });
}

function showList() {
  buttonShow.classList.add('invisible');
  containerForList.classList.add('visible');
}

function closeList() {
  buttonShow.classList.remove('invisible');
  containerForList.classList.remove('visible');
}

function chooseFileNameFromList(event) {
  const textOfLink = event.target.text;

  if (textOfLink) {
    const choosen = textOfLink.replace(/^(.*?) /, '').trim();

    if (choosen === nameOfDownloadFile.value) {
      showMessage('ALREADY_CHOSEN');
      return;
    }
    nameOfDownloadFile.value = choosen;
  }
}

