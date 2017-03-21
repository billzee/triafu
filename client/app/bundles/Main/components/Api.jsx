import ReactOnRails from 'react-on-rails';

export default function api(url, options={}) {
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

    // if(options.queryParams) {
    //     url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
    //     delete options.queryParams;
    // }

    return fetch(url, options);
}
