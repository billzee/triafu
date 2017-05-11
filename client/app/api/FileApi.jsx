import ReactOnRails from 'react-on-rails';

export default function FileApi(url, options={}){
  options = {
      headers: {
        'X-CSRF-Token': ReactOnRails.authenticityToken()
      },
      credentials: 'same-origin',
      redirect: 'error',
      cache: false,
      contentType: false,
      processData: false,
      ...options
  };

  return fetch(url, options);
}
