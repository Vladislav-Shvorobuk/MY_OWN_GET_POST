/* global  setMessage, request, updateList, onUploadProgress, uploadProgressBar, uploadProgressValue*/

function upload(event) {
  event.preventDefault();
  const [file] = event.target.sampleFile.files;

  if (!file) {
    setMessage('CHOOSE_A_FILE');
    return;
  }

  const form = new FormData();
  form.append('sampleFile', file);

  request.post('/upload', { data: form, onUploadProgress })
    .then(() => {
      updateList();
      setMessage('SUCCES_DOWNLOAD_FILE');
    })
    .catch(error => {
      uploadProgressBar.classList.remove('visible');
      uploadProgressValue.classList.remove('visible');
      setMessage('ERROR', `${error}`);
    });
}