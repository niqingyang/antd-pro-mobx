import axios from 'axios';

export async function fetchRandomUser() {
    return axios.get('https://randomuser.me/api');
}