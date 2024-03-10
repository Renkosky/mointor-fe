import { extend } from 'umi-request';

const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
  } else {
    return 'http://localhost:8080';
  }
};
const request = extend({
  prefix: getUrl(),
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : '',
  },
});
export default request;
