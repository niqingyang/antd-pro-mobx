// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/stable';
import React from 'react';
import ReactDom from 'react-dom';
import {LocaleProvider} from 'antd';
import {app} from 'mobx-react-stores';
import get from 'lodash/get';
import './utils/axios'; // 初始化拦截器
import './global.less';
import * as serviceWorker from './serviceWorker';

app.stores = require('./models').default;
app.router = require('./default.router').default;

app.defaultLoadingComponent = require('./components/PageLoading').default;

app.renderCallback = (children) => {

    const {locale} = app.stores;

    const antd = get(app.stores, 'locale.translation.antd', undefined);

    if (antd) {
        return (
            <LocaleProvider locale={antd.default || antd}>
                {children}
            </LocaleProvider>
        );
    }

    return children;
};

app.render(document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
