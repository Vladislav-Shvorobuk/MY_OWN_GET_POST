/* eslint-disable no-undef */
const chooseFile = document.getElementById('chooseFile');
const nameOfDownloadFile = document.querySelector('.nameOfDownloadFile');
const nameOfUploadFile = document.querySelector('.nameOfUploadFile');


chooseFile.addEventListener('change', function setFileName(event) {
  nameOfUploadFile.innerHTML = event.target.files[0].name;
});

listOfFiles.addEventListener('click', function chooseFileNameFromList(event) {
  if (event.target.text) {
    const choosen = event.target.text.replace(/^(.*?) /, '').trim();

    if (choosen === nameOfDownloadFile.value) {
      setMessage('ALREADY_CHOSEN');
      return;
    }
    nameOfDownloadFile.value = choosen;
  }
});

function viewImage(data) {
  document.querySelector('.image').src = URL.createObjectURL(data);
}

function downloadFile(data, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(data);
  link.download = fileName;
  link.click();
}

