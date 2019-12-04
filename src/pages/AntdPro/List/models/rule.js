import {action, observable} from "mobx";
import {namespace, loading} from 'mobx-react-stores';
import {queryRule, removeRule, addRule, updateRule} from '@/services/api';

@namespace("rule")
class Rule {
    @observable
    data = {
        list: [],
        pagination: {},
    }

    fetch = async (payload) => {
        const response = await queryRule(payload);
        this.save(response);
    }

    add = async (payload, callback) => {
        const response = await addRule(payload);
        this.save(response);
        if (callback) callback();
    }

    remove = async (payload, callback) => {
        const response = await removeRule(payload);
        this.save(response);
        if (callback) callback();
    }

    update = async (payload, callback) => {
        const response = await updateRule(payload);
        this.save(response);
        if (callback) callback();
    }

    @action
    save = (payload) => {
        this.data = payload;
    }

}

export default new Rule();
