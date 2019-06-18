import axios from 'axios';

export async function query() {
    return axios.get('/api/users');
}

export async function queryCurrent() {
    return axios.get('/api/currentUser');
}
