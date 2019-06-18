import axios from 'axios';

export default async function queryError(code) {
  return axios.get(`/api/${code}`);
}
