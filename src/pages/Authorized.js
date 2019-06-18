import React from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import pathToRegexp from 'path-to-regexp';
import Authorized from '../utils/Authorized';
import {getAuthority} from '../utils/authority';
import Exception403 from './Exception/403';

@inject(({menu: menuModel}) => {
    return {
        routerData: menuModel.routerData
    }
})
@observer
class AuthComponent extends React.Component {

    render() {

        const {children, location, routerData} = this.props;

        const auth = getAuthority();

        const isLogin = auth && auth[0] !== 'guest';
        const getRouteAuthority = (path, routeData) => {
            let authorities;
            routeData.forEach(route => {
                // match prefix
                if (pathToRegexp(`${route.path}(.*)`).test(path)) {

                    authorities = route.authority || authorities;

                    // get children authority recursively
                    if (route.routes) {
                        authorities = getRouteAuthority(path, route.routes) || authorities;
                    }
                }
            });
            return authorities;
        };

        return (
            <Authorized
                authority={getRouteAuthority(location.pathname, routerData)}
                noMatch={isLogin ? <Exception403/> : <Redirect to="/user/login"/>}
            >
                {children}
            </Authorized>
        );
    }
}

export default AuthComponent;
