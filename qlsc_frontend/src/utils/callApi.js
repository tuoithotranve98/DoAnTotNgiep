import axios from 'axios';
import storage from './storage';
import * as API from 'constants/api';

const callApi = function callApi(url, options) {
  const accessToken = storage.get('token', false);
  if (!options.mode) {
    options.mode = 'cors';
  }
  if (options.headers) {
    if (!options.headers['X-APP-PAGE-TOKEN']) {
      Object.assign(options.headers, { 'X-APP-PAGE-TOKEN': accessToken });
    }
    if (!options.headers['Content-Type']) {
      Object.assign(options.headers, { 'Content-Type': 'application/json' });
    }
    if (!options.headers['Access-Control-Allow-Origin']) {
      Object.assign(options.headers, { 'Access-Control-Allow-Origin': "*"});
    }
  } else {
    options.headers = {
      'X-APP-PAGE-TOKEN': accessToken,
      'Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',

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
