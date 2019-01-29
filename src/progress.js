
function onUploadProgress(xhr) {
  const uploadProgress = document.getElementById('upload-progress');
  const { title } = document;

  xhr.upload.onloadstart = function(e) {
    uploadProgress.classList.add('visible');
    uploadProgress.value = 0;
    uploadProgress.max = e.total;
  };

  xhr.upload.onprogress = function(e) {
    const persentage = `${parseInt(((e.loaded / e.total) * 100), 10)}%`;
    document.title = `${title} ${persentage}`;
    uploadProgress.value = e.loaded;
    uploadProgress.max = e.total;
  };

  xhr.upload.onloadend = function(e) {
    uploadProgress.classList.remove('visible');
    document.title = `${title} 100%`;
    setTimeout(() => {
      document.title = title;
    }, 1000);
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
    }, 1000);
  };
}

function viewImage(xhr) {
  const imageUrl = URL.createObjectURL(xhr.response);
  const img = document.querySelector('.image');
  img.src = imageUrl;
}

function downloadFile(data) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(data);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.download = data.type;
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
