const buttonShow = document.querySelector('.buttonShow');
const listOfFiles = document.querySelector('.listOfFiles');
const buttonClose = document.querySelector('.fa-times');


buttonShow.addEventListener('click', function showList() {
  buttonShow.style.display = 'none';
  listOfFiles.style.display = 'block';

  const http = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  http.get('/list')
    .then(data => {
      data.response.forEach((file, index) => {
        const p = document.createElement('p');
        listOfFiles.appendChild(p);
        p.innerHTML = `${index + 1})  ${file}`;
      });
    });
});

buttonClose.addEventListener('click', function closeList() {
  buttonShow.style.display = 'block';
  listOfFiles.style.display = 'none';

  const content = listOfFiles.getElementsByTagName('p');

  for (let i = content.length - 1; i >= 0; i--) {
    listOfFiles.removeChild(content[i]);
  }
});