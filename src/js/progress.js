const uploadProgressBar = document.querySelector('.upload-progress');
const downLoadProgressBar = document.querySelector('.download-progress');
const uploadProgressValue = document.querySelector('.uploadProgressValue');
const titleValue = document.querySelector('title');

function onProgress(progArgs) {
  const { event,
    progressBar,
    progressValue,
    onProgressStart,
    onProgressEnd,
    text = '',
    finalText = '' } = progArgs;

  onProgressStart([progressValue, progressBar]);

  const persentage = `${parseInt(((event.loaded / event.total) * 100), 10)}%`;
  progressBar.value = event.loaded;
  progressBar.max = event.total;
  progressValue.innerHTML = `${text} ${persentage}`;

  if (progressBar.value === progressBar.max) {
    setTimeout(() => {
    progressValue.innerHTML = finalText;
    onProgressEnd([progressValue, progressBar], progressValue, finalText);
  }, 1300);
  }
}

function makeProgressVisible(nodeElements) {
  nodeElements.forEach(el => el.classList.add('visible'));
}

function makeProgessInvisible(nodeElements) {
    nodeElements.forEach(el => el.classList.remove('visible'));
}

function onUploadProgress(event) {
  onProgress({ event,
    progressBar: uploadProgressBar,
    progressValue: uploadProgressValue,
    onProgressStart: makeProgressVisible,
    onProgressEnd: makeProgessInvisible,
    text: 'PROGRESS -',
    finalText: 'SUCCESS' });
}

function onDownloadProgress(event) {
  onProgress({ event,
    progressBar: downLoadProgressBar,
    progressValue: titleValue,
    onProgressStart: makeProgressVisible,
    onProgressEnd: makeProgessInvisible,
    text: 'Load 📂',
    finalText: 'Load' });
}