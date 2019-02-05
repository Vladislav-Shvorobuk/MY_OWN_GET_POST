/* global  setMessage*/
const nameOfDownloadFile = document.querySelector('.nameOfDownloadFile');
const nameOfUploadFile = document.querySelector('.nameOfUploadFile');

function setFileName(event) {
  nameOfUploadFile.innerHTML = event.target.files[0].name;
}

function chooseFileNameFromList(event) {
  const textOfLink = event.target.text;

  if (textOfLink) {
    const choosen = textOfLink.replace(/^(.*?) /, '').trim();

    if (choosen === nameOfDownloadFile.value) {
      setMessage('ALREADY_CHOSEN');
      return;
    }
    nameOfDownloadFile.value = choosen;
  }
}