import {action, observable} from 'mobx';
import {namespace} from 'mobx-react-stores';
import {fakeRegister} from '@/services/api';
import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';

@namespace("register")
class Register {
    @observable
    status = undefined

    submit = async (params) => {
        const response = await fakeRegister(params);
        this.registerHandle(response);
    }

    @action
    registerHandle = ({status}) => {
        setAuthority('user');
        reloadAuthorized();

        this.status = status;
    }
}

export default new Register();
