import axios from 'axios';

export async function queryProvince() {
    return axios.get('/api/geographic/province');
}

export async function queryCity(province) {
    return axios.get(`/api/geographic/city/${province}`);
}
