import {stores} from 'mobx-react-stores';
import user from './user';
import global from './global';
import menu from './menu';
import setting from './setting';
import login from './login';
import Local from './locale';

stores.add(global);
stores.add(user);
stores.add(menu);
stores.add(setting);
stores.add(login);

const translations = {
    'en-US': {
        messages: {
            ...require('../locales/en-US.js').default,
        },
        locale: 'en-US',
        antd: require('antd/lib/locale-provider/en_US'),
        data: require('react-intl/locale-data/en'),
        momentLocale: '',
    },
    'pt-BR': {
        messages: {
            ...require('../locales/pt-BR.js').default,
        },
        locale: 'pt-BR',
        antd: require('antd/lib/locale-provider/pt_BR'),
        data: require('react-intl/locale-data/pt'),
        momentLocale: 'pt-br',
    },
    'zh-CN': {
        messages: {
            ...require('../locales/zh-CN.js').default,
        },
        locale: 'zh-CN',
        antd: require('antd/lib/locale-provider/zh_CN'),
        data: require('react-intl/locale-data/zh'),
        momentLocale: 'zh-cn',
    },
    'zh-TW': {
        messages: {
            ...require('../locales/zh-TW.js').default,
        },
        locale: 'zh-TW',
        antd: require('antd/lib/locale-provider/zh_TW'),
        data: require('react-intl/locale-data/zh'),
        momentLocale: 'zh-tw',
    }
};

stores.add(new Local('zh-CN', translations));

export default stores;