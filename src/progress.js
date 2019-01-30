
function onUploadProgress(xhr) {
  const uploadProgress = document.getElementById('upload-progress');
  const progressValue = document.querySelector('.uploadProgressValue');

  xhr.upload.onloadstart = function(e) {
    progressValue.classList.add('visible');
    uploadProgress.classList.add('visible');
    uploadProgress.value = 0;
    uploadProgress.max = e.total;
  };

  xhr.upload.onprogress = function(e) {
    const persentage = `${parseInt(((e.loaded / e.total) * 100), 10)}%`;
    progressValue.innerHTML = `${persentage}`;
    uploadProgress.value = e.loaded;
    uploadProgress.max = e.total;
  };

  xhr.upload.onloadend = function(e) {
    progressValue.innerHTML = '100 %';
    setTimeout(() => {
      progressValue.classList.remove('visible');
      uploadProgress.classList.remove('visible');
    }, 1500);
  };
}

function onDownloadProgress(xhr) {
  const downLoadProgress = document.getElementById('download-progress');
  const { title } = document;

  xhr.onloadstart = function(e) {
    downLoadProgress.classList.add('visible');
    downLoadProgress.value = 0;
    downLoadProgress.max = e.total;
  };

  xhr.onprogress = function(e) {
    const persentage = `${parseInt(((e.loaded / e.total) * 100), 10)}%`;
    document.title = `${title} ${persentage}`;
    downLoadProgress.value = e.loaded;
    downLoadProgress.max = e.total;
  };

  xhr.onloadend = function(e) {
    downLoadProgress.classList.remove('visible');
    document.title = `${title} 100%`;
    setTimeout(() => {
      document.title = title;
    }, 1500);
  };
}

function viewImage(xhr) {
  const imageUrl = URL.createObjectURL(xhr.response);
  const img = document.querySelector('.image');
  img.src = imageUrl;
}

function downloadFile(data, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(data);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.download = fileName;
  link.click();
  document.body.removeChild(link);
}

function setMessage(selector, messageText) {
  const message = document.querySelector(selector);
  message.innerHTML = messageText;
  message.style.border = '1px solid #4FD666';
  setTimeout(() => {
    message.innerHTML = '';
    message.style.border = 'none';
  }, 2000);
}
