import {stringify} from 'qs';
import axios from 'axios';

export async function queryProjectNotice() {
    return axios.get('/api/project/notice');
}

export async function queryActivities() {
    return axios.get('/api/activities');
}

export async function queryRule(params) {
    return axios.get(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return axios.post('/api/rule', {
        ...params,
        method: 'delete',
    });
}

export async function addRule(params) {
    return axios.post('/api/rule', {
        ...params,
        method: 'post',
    });
}

export async function updateRule(params = {}) {
    return axios.post(`/api/rule?${stringify(params.query)}`, {
        ...params.body,
        method: 'update',
    });
}

export async function fakeSubmitForm(params) {
    return axios.post('/api/forms', params);
}

export async function fakeChartData() {
    return axios.get('/api/fake_chart_data');
}

export async function queryTags() {
    return axios.get('/api/tags');
}

export async function queryBasicProfile(id) {
    return axios.get(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
    return axios.get('/api/profile/advanced');
}

export async function queryFakeList(params) {
    return axios.get(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
    const {count = 5, ...restParams} = params;
    return axios.post(`/api/fake_list?count=${count}`, {
        ...restParams,
        method: 'delete',
    });
}

export async function addFakeList(params) {
    const {count = 5, ...restParams} = params;
    return axios.post(`/api/fake_list?count=${count}`, {
        ...restParams,
        method: 'post',
    });
}

export async function updateFakeList(params) {
    const {count = 5, ...restParams} = params;
    return axios.post(`/api/fake_list?count=${count}`, {
        ...restParams,
        method: 'update',
    });
}

export async function fakeAccountLogin(params) {
    return axios.post('/api/login/account', params);
}

export async function fakeRegister(params) {
    return axios.post('/api/register', params);
}

export async function queryNotices(params = {}) {
    return axios.get(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
    return axios.get(`/api/captcha?mobile=${mobile}`);
}
