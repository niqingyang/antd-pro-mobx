import {action, observable} from "mobx";
import {namespace, loading} from 'mobx-react-stores';
import {queryBasicProfile, queryAdvancedProfile} from '@/services/api';

@namespace
class Profile {

    @observable
    basicGoods = []

    @observable
    advancedOperation1 = []

    @observable
    advancedOperation2 = []

    @observable
    advancedOperation3 = []

    fetchBasic = async (payload) => {
        const response = await queryBasicProfile(payload);
        this.show(response);
    }

    fetchAdvanced = async () => {
        const response = await queryAdvancedProfile();
        this.show(response);
    }

    @action
    show = (payload) => {
        Object.assign(this, payload);
    }
}

export default new Profile();
