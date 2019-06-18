import React, {Component, Fragment} from 'react';
import {injectIntl} from 'react-intl';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import getPageTitle from '@/utils/getPageTitle';

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright"/> 2018 蚂蚁金服体验技术部出品
    </Fragment>
);

@inject(({stores: {dispatch, menu: menuModel}}) => ({
    dispatch,
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap
}))
@injectIntl
@observer
class UserLayout extends Component {

    links = null

    componentDidMount = () => {
        const {
            intl: {formatMessage},
            dispatch,
            route: {routes, authority},
        } = this.props;

        dispatch({
            type: 'menu/getMenuData',
            payload: {routes, authority},
        });

        if (this.links === null) {
            this.links = [
                {
                    key: 'help',
                    title: formatMessage({id: 'layout.user.link.help'}),
                    href: '',
                },
                {
                    key: 'privacy',
                    title: formatMessage({id: 'layout.user.link.privacy'}),
                    href: '',
                },
                {
                    key: 'terms',
                    title: formatMessage({id: 'layout.user.link.terms'}),
                    href: '',
                },
            ];
        }
    }

    render() {
        const {
            children,
            location: {pathname},
            breadcrumbNameMap,
        } = this.props;

        return (
            <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <div className={styles.container}>
                    <div className={styles.lang}>
                        <SelectLang/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.header}>
                                <Link to="/">
                                    <img alt="logo" className={styles.logo} src={logo}/>
                                    <span className={styles.title}>Ant Design</span>
                                </Link>
                            </div>
                            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                        </div>
                        {children}
                    </div>
                    <GlobalFooter links={this.links} copyright={copyright}/>
                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
