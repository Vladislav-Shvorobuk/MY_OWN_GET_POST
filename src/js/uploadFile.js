/* global  showMessage, request, updateList, onUploadProgress, uploadProgressBar, uploadProgressValue*/
const nameOfUploadFile = document.querySelector('.nameOfUploadFile');

function upload(event) {
  event.preventDefault();
  const [file] = event.target.sampleFile.files;

  if (!file) {
    showMessage('CHOOSE_A_FILE');
    return;
  }

  const form = new FormData();
  form.append('sampleFile', file);

  request.post('/upload', { data: form, onUploadProgress })
    .then(() => {
      updateList();
      showMessage('SUCCES_DOWNLOAD_FILE');
    })
    .catch(error => {
      uploadProgressBar.classList.remove('visible');
      uploadProgressValue.classList.remove('visible');
      showMessage('ERROR', `${error}`);
    });
}

function setFileName(event) {
  nameOfUploadFile.innerHTML = event.target.files[0].name;
}