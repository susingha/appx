var xhr = null;

export const xhrSend = (url, addHeaderRef, responseRef, fdata) => {
  var request;
  console.log('sup: sending xhr: ' + url);

  xhr = null; // Toggle xhr object reuse to create new

  if (xhr == null) {
    xhr = new XMLHttpRequest();
    // console.log('sup:a got a new xhr');
  }
  request = xhr;
  request.onreadystatechange = e => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      // console.log('sup:200 printing response headers:');
      // console.log(request.getAllResponseHeaders());
      responseRef(request.responseText);
    } else if (request.status === 302) {
      // console.log('sup:302 printing response headers:');
      // console.log(request.getAllResponseHeaders());
    } else {
      console.warn('error');
    }
  };

  var meth = 'POST';
  if (fdata == null) {
    meth = 'GET';
  }

  request.open(meth, url, true);
  request.withCredentials = true;

  if (addHeaderRef != null) addHeaderRef(request);

  request.send(fdata);
};

export const fetchSend = (url, addHeaderRef, responseRef, fdata) => {
  console.log('sup: sending fetch req: ' + url);
};
