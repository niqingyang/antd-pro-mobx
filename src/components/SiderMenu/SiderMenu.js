import React, {PureComponent, Suspense} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import {Layout} from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import PageLoading from '../PageLoading';
import {getDefaultCollapsedSubMenus} from './SiderMenuUtils';
import {title} from '../../default.setting';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const {Sider} = Layout;

let firstMount = true;

class SiderMenu extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            openKeys: getDefaultCollapsedSubMenus(props),
        };
    }

    componentDidMount() {
        firstMount = false;
    }

    static getDerivedStateFromProps(props, state) {

        const {pathname, flatMenuKeysLen} = state;
        if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
            return {
                pathname: props.location.pathname,
                flatMenuKeysLen: props.flatMenuKeys.length,
                openKeys: getDefaultCollapsedSubMenus(props),
            };
        }
        return null;
    }

    isMainMenu = key => {
        const {menuData} = this.props;
        return menuData.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;

        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        });
    };

    handleSubMenuMouseEnter = ({key}) => {
        this.setState({
            mode: 'vertical'
        })
    };

    handleSubMenuMouseLeave = ({key}) => {
        this.setState({
            mode: 'inline'
        })
    };

    render() {
        const {logo, collapsed, onCollapse, fixSiderbar, theme, isMobile} = this.props;
        const {openKeys, mode} = this.state;

        const defaultProps = collapsed ? {} : {openKeys};

        const siderClassName = classNames(styles.sider, {
            [styles.fixSiderBar]: fixSiderbar,
            [styles.light]: theme === 'light',
        });

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={collapse => {
                    if (firstMount || !isMobile) {
                        onCollapse(collapse);
                    }
                }}
                width={256}
                theme={theme}
                className={siderClassName}
            >
                <div className={styles.logo} id="logo">
                    <Router>
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                            <h1>{title}</h1>
                        </Link>
                    </Router>
                </div>
                <Suspense fallback={<PageLoading/>}>
                    <BaseMenu
                        {...this.props}
                        mode={mode}
                        handleOpenChange={this.handleOpenChange}
                        onOpenChange={this.handleOpenChange}
                        onSubMenuMouseEnter={this.handleSubMenuMouseEnter}
                        onSubMenuMouseLeave={this.handleSubMenuMouseLeave}
                        style={{padding: '16px 0', width: '100%'}}
                        {...defaultProps}
                    />
                </Suspense>
            </Sider>
        );
    }
}

export default SiderMenu;
