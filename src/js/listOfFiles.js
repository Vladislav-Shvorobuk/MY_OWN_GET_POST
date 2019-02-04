/* eslint-disable no-undef */
const buttonShow = document.querySelector('.buttonShow');
const containerForList = document.querySelector('.containerForList');
const listOfFiles = document.querySelector('.listOfFiles');
const buttonClose = document.querySelector('.fa-times');

function updateList() {
  request.get('/list')
    .then(response => {
      listOfFiles.innerHTML =
      response.reduce((accumulator, file, index) => `${accumulator}<p><a>${index + 1})  ${file}</a></p>\n`, '');
    });
}

buttonShow.addEventListener('click', function showList() {
  buttonShow.classList.add('invisible');
  containerForList.classList.add('visible');
  updateList();
});

buttonClose.addEventListener('click', function closeList() {
  buttonShow.classList.remove('invisible');
  containerForList.classList.remove('visible');
});

