import {action, observable} from "mobx";
import {namespace, loading} from 'mobx-react-stores';
import {queryFakeList, removeFakeList, addFakeList, updateFakeList} from '@/services/api';

@namespace
class List {

    list = []

    fetch = async (payload) => {
        const response = await queryFakeList(payload);
        this.queryList(Array.isArray(response) ? response : []);
    }

    appendFetch = async (payload) => {
        const response = await queryFakeList(payload);
        this.appendList(Array.isArray(response) ? response : []);
    }

    submit = async (payload) => {
        let callback;
        if (payload.id) {
            callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
        } else {
            callback = addFakeList;
        }
        const response = await callback(payload); // post
        this.queryList(response);
    }

    @action
    queryList = (payload) => {
        this.list = payload;
    }

    @action
    appendList = (payload) => {
        this.list.concat(payload);
    }
}

export default new List();
