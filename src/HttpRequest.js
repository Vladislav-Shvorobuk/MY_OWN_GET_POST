/* eslint-disable */
class HttpRequest {
  // get request options({ baseUrl, headers })
  constructor({ baseUrl = '', headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(URL = '', config = {}) {
    const {_headers, _params, responseType = 'json', onDownloadProgress } = config;
    const headers = {..._headers, ...this.headers};
    const params = !_params ? '' : _params;
    const xhr = new XMLHttpRequest();

    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    xhr.responseType = responseType;

    if (onDownloadProgress) { onDownloadProgress(xhr); }

    xhr.open('GET', this.baseUrl + URL + params, true);
    xhr.send();

    return getResponse(xhr);
  }


  post(URL, config = {}) {
    const {transformResponse, _headers, data, responseType, onUploadProgress } = config;
    const headers = {..._headers, ...this.headers};
    const _data = data;
    // xhr.setRequestHeader('Content-type', `${Content - type}`);
    const xhr = new XMLHttpRequest();

    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    xhr.responseType = responseType || 'json';
    if(transformResponse){
      _data = transformResponse.reduce((acc, f) => f(acc), data);
    }

    if (onUploadProgress) { onUploadProgress(xhr); }
    xhr.open('POST', this.baseUrl + URL, true);
    xhr.send(_data);
    return getResponse(xhr);
  }
}

function getResponse(xhr) {
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status === 200) {
        resolve(xhr);
      } else {
        reject(`ERROR ${xhr.status} : ${xhr.statusText}`);
      }
    };
  });
}



/*
const reuest = new HttpRequest({
  baseUrl: 'http://localhost:3000',
});

reuest.get('/user/12345', { onDownloadProgress, headers: {contentType: undefined} })
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });

reuest.post('/save', { data: formdata, header, onUploadProgress })
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });

config = {

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer

  data: {
    firstName: 'Fred'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
}
*/