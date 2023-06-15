import axios from 'axios';
import { isEmpty, omit } from 'lodash';
import { getAbsoluteApiUrl, getUrlWithParam } from '../helpers/url';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const baseUrl = 'https://localhost';

export const requestErrorHandler = (e, cb) => {
  if (e.response && e.response.status === 401) {
    cb({
      message: 'Session expired or not signed in. Please sign in again',
      status: 401,
    });
    return;
  }
  if (
    e.response &&
    e.response.data &&
    e.response.data.errors &&
    !isEmpty(e.response.data.errors)
  ) {
    let errors = [];
    for (const errorField in e.response.data.errors) {
      errors.push(e.response.data.errors[errorField]);
    }
    cb({ message: errors });
  } else if (e.response && e.response.data && e.response.data.message) {
    cb({ message: e.response.data.message, status: e.response.status });
  } else {
    cb(e);
  }
};

const apiWrapper = (method, url, headers, data = null) => {
  return new Promise(async (resolve, reject) => {
    let postHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };
    // if (data instanceof FormData) {
    //     delete postHeader['Content-Type'];
    // }

    if (data instanceof Object && !(data instanceof FormData)) {
      data = omit(data, 'errors');
    }
    let absUrl = getAbsoluteApiUrl(url, baseUrl);
    if (method === 'DELETE' || method === 'GET') {
      absUrl = getUrlWithParam(absUrl, data);
    }
    try {
      let response = null;
      if (method === 'GET') {
        response = await axios.get(absUrl, { headers: postHeader });
      } else if (method === 'POST') {
        response = await axios.post(absUrl, data, {
          headers: postHeader,
        });
      } else if (method === 'PUT') {
        response = await axios.put(absUrl, data, {
          headers: postHeader,
        });
      } else {
        response = await axios.delete(absUrl, { headers: postHeader });
      }
        console.log({ response });
      if (response.status < 300) {
        resolve(response.data);
      } else {
        reject({ message: response.data.message });
      }
    } catch (e) {
      requestErrorHandler(e, reject);
    }
  });
};

const Api = {
  get: (url, data, headers) => {
    return apiWrapper('GET', url, headers, data);
  },
  post: (url, data, headers) => {
    return apiWrapper('POST', url, headers, data);
  },
  put: (url, data, headers) => {
    return apiWrapper('PUT', url, headers, data);
  },
  delete: (url, data, headers) => {
    return apiWrapper('DELETE', url, headers, data);
  },
};
export default Api;
