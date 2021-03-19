import axios from 'axios';
import storage from './storage';

const callApi = function callApi(url, options) {
  const accessToken = storage.get('token', false);
  if (!options.mode) {
    options.mode = 'cors';
  }
  if (options.headers) {
    if (!options.headers['X-BIZWEB-APP-FPAGE-TOKEN']) {
      Object.assign(options.headers, { 'X-BIZWEB-APP-FPAGE-TOKEN': accessToken });
    }
    if (!options.headers['Content-Type']) {
      Object.assign(options.headers, { 'Content-Type': 'application/json' });
    }
    if (!options.headers['X-SOCIAL-TIMESTAMP']) {
      Object.assign(options.headers, { 'X-SOCIAL-TIMESTAMP': new Date().getTime() });
    }
  } else {
    options.headers = {
      'X-BIZWEB-APP-FPAGE-TOKEN': accessToken,
      'Content-Type': 'application/json',
      'X-SOCIAL-TIMESTAMP': new Date().getTime(),
    };
  }
  options.url = url;

  return axios(options)
    .then(
      (response) => { return response; },
      (error) => { return error; },
    );
};

export default callApi;
