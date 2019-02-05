class HttpRequest {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(url, config = {}) {
    return this.__request('GET', url, config);
  }

  post(url, config = {}) {
    return this.__request('POST', url, config);
  }

  __request(method, url, config) {
    const {
      headers,
      params,
      data = null,
      responseType = 'json',
      onDownloadProgress = null,
      onUploadProgress = null,
      transformResponse
    } = config;

    const URL = HttpRequest.getURL(url, this.baseUrl, params);
    const xhrHeaders = { ...this.headers, ...headers };
    const xhr = new XMLHttpRequest();

    xhr.responseType = responseType;
    xhr.upload.onprogress = onUploadProgress;
    xhr.onprogress = onDownloadProgress;
    Object.entries(xhrHeaders).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    xhr.open(method, URL);

    return new Promise((res, rej) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          return res(
            transformResponse ?
              transformResponse.reduce((acc, f) => f(acc), xhr.response) :
              xhr.response
          );
        }
        rej(new Error(`${xhr.status} : ${xhr.statusText}`));
      };
      xhr.send(data);
    });
  }

  static getURL(urlString, baseURLstring, objParams) {
    const url = new URL(urlString, baseURLstring);

    if (objParams instanceof URLSearchParams) {
      Object.entries(objParams).forEach(([key, value]) => url.searchParams.set(key, value));
    } else if (objParams) {
      Object.entries(objParams).forEach(param => url.searchParams.set(param, objParams[param]));
    }
    return url;
  }
}
