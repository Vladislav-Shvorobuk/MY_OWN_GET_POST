// /* eslint-disable*/
const chooseFile = document.getElementById('chooseFile');
const nameOfUploadFile = document.querySelector('.nameOfUploadFile');

chooseFile.addEventListener('change', function setFileName() {
  nameOfUploadFile.innerHTML = chooseFile.value.replace(/.*\\/, '');
});

function viewImage(xhr) {
  document.querySelector('.image').src = URL.createObjectURL(xhr.response);
}
