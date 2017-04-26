import ReactOnRails from 'react-on-rails';

export default function Api(url, options={}){
  options = {
      // your default options
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken()
      },
      credentials: 'same-origin',
      redirect: 'error',
      ...options,
  };

  if(options.params){
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.params);
    delete options.params;
  }

  return fetch(url, options);
}

function queryParams(params){
  return Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
}
