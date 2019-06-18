import {action, observable} from "mobx";
import {namespace, loading} from 'mobx-react-stores';
import {fakeRegister} from '@/services/api';
import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';

export default class {

    namespace = 'register'

    @observable
    status = undefined

    submit = async (payload) => {
        const response = await fakeRegister(payload);
        this.registerHandle(response);
    }

    @action
    registerHandle = ({status}) => {
        setAuthority('user');
        reloadAuthorized();

        this.status = status;
    }
}
