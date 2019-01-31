
function onUploadProgress(xhr) {
  const uploadProgress = document.querySelector('.upload-progress');
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
    }, 1300);
  };
}

function onDownloadProgress(xhr) {
  const downLoadProgress = document.querySelector('.download-progress');
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
    }, 1300);
  };
}

function downloadFile(data, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(data);
  link.download = fileName;
  link.click();
}
