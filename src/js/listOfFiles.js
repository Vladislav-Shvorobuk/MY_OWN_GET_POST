/* global request*/
const buttonShow = document.querySelector('.buttonShow');
const buttonClose = document.querySelector('.fa-times');
const containerForList = document.querySelector('.containerForList');
const listOfFiles = document.querySelector('.listOfFiles');


function updateList() {
  request.get('/list')
    .then(data => {
      listOfFiles.innerHTML =
      data.reduce((accumulator, file, index) => `${accumulator}<p><a>${index + 1})  ${file}</a></p>\n`, '');
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

