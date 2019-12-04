import {action, observable} from "mobx";
import {stores, namespace, loading} from 'mobx-react-stores';
import {stringify} from 'qs';
import {fakeAccountLogin, getFakeCaptcha} from '../services/api';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {reloadAuthorized} from '@/utils/Authorized';

@namespace("login")
class Login {

    @observable
    status

    @loading
    @action
    login = async (payload) => {
        const response = await fakeAccountLogin(payload);

        this.changeLoginStatus(response);

        if (response.status === 'ok') {
            reloadAuthorized();
            const urlParams = new URL(window.location.href);
            const params = getPageQuery();
            let {redirect} = params;
            if (redirect) {
                const redirectUrlParams = new URL(redirect);
                if (redirectUrlParams.origin === urlParams.origin) {
                    redirect = redirect.substr(urlParams.origin.length);
                    if (redirect.match(/^\/.*#/)) {
                        redirect = redirect.substr(redirect.indexOf('#') + 1);
                    }
                } else {
                    redirect = null;
                }
            }
            await stores.routing.replace(redirect || '/');
        }
    }

    getCaptcha = async (mobile) => {
        const response = await getFakeCaptcha(mobile);
        return response;
    }

    logout = () => {

        this.changeLoginStatus({
            status: false,
            currentAuthority: 'guest',
        });

        reloadAuthorized();


        // redirect
        if (window.location.pathname !== '/user/login') {
            stores.routing.replace({
                pathname: '/user/login',
                search: stringify({
                    redirect: window.location.href,
                }),
            });
        }
    }

    @action
    changeLoginStatus = ({status, type, currentAuthority}) => {
        setAuthority(currentAuthority);

        this.type = type;
        this.status = status;
    }
}

export default new Login();
