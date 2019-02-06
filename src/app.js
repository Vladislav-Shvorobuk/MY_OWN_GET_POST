/* global  HttpRequest, upload, download, setFileName, listOfFiles, setFileName,
 chooseFileNameFromList, buttonShow, buttonClose, showList, closeList, updateList*/
 const uploadForm = document.getElementById('uploadForm');
 const downloadForm = document.getElementById('downloadForm');
 const chooseFile = document.getElementById('chooseFile');
 const request = new HttpRequest({ baseUrl: 'http://localhost:8000' });
 
 
 uploadForm.addEventListener('submit', upload);
 downloadForm.addEventListener('submit', download);
 chooseFile.addEventListener('change', setFileName);
 listOfFiles.addEventListener('click', chooseFileNameFromList);
 buttonShow.addEventListener('click', () => {
   updateList();
   showList();
 });
 buttonClose.addEventListener('click', closeList);