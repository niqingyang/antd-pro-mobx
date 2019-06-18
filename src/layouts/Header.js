import React, {Component} from 'react';
import {Layout, message} from 'antd';
import {inject, observer} from "mobx-react";
import Animate from 'rc-animate';
import {injectIntl} from 'react-intl';
import GlobalHeader from '../components/GlobalHeader';
import TopNavHeader from '../components/TopNavHeader';
import styles from './Header.less';

const {Header} = Layout;

@inject(({stores: {dispatch, intl, routing, user, global, setting, loading}}) => ({
    dispatch,
    intl,
    routing,
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    notices: global.notices,
    setting,
}))
@observer
class HeaderView extends Component {
    state = {
        visible: true,
    };

    static getDerivedStateFromProps(props, state) {
        if (!props.autoHideHeader && !state.visible) {
            return {
                visible: true,
            };
        }
        return null;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handScroll, {passive: true});
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handScroll);
    }

    getHeadWidth = () => {
        const {isMobile, collapsed, setting} = this.props;
        const {fixedHeader, layout} = setting;
        if (isMobile || !fixedHeader || layout === 'topmenu') {
            return '100%';
        }
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
    };

    // 情况消息
    handleNoticeClear = type => {

        const {dispatch, clearNotices, intl: {formatMessage}} = this.props;

        message.success(
            `${formatMessage({id: 'component.noticeIcon.cleared'})} ${formatMessage({
                id: `component.globalHeader.${type}`,
            })}`
        );

        dispatch({
            type: 'global/clearNotices',
            payload: type,
        });
    };

    handleMenuClick = ({key}) => {
        const {dispatch, routing} = this.props;
        if (key === 'userCenter') {
            routing.push('/antd-pro/account/center');
            return;
        }
        if (key === 'triggerError') {
            routing.push('/exception/trigger');
            return;
        }
        if (key === 'userinfo') {
            routing.push('/antd-pro/account/settings/base');
            return;
        }
        if (key === 'logout') {
            dispatch({
                type: 'login/logout',
            });
        }
    };

    // 消息窗口状态改变
    handleNoticeVisibleChange = visible => {
        if (visible) {
            const {dispatch} = this.props;
            dispatch({
                type: 'global/fetchNotices',
            });
        }
    };

    // 滚动事件
    handScroll = () => {
        const {autoHideHeader} = this.props;
        const {visible} = this.state;
        if (!autoHideHeader) {
            return;
        }
        const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => {
                if (this.oldScrollTop > scrollTop) {
                    this.setState({
                        visible: true,
                    });
                } else if (scrollTop > 300 && visible) {
                    this.setState({
                        visible: false,
                    });
                } else if (scrollTop < 300 && !visible) {
                    this.setState({
                        visible: true,
                    });
                }
                this.oldScrollTop = scrollTop;
                this.ticking = false;
            });
        }
    };

    render() {
        const {isMobile, handleMenuCollapse, setting} = this.props;
        const {navTheme, layout, fixedHeader} = setting;
        const {visible} = this.state;
        const isTop = layout === 'topmenu';
        const width = this.getHeadWidth();
        const HeaderDom = visible ? (
            <Header
                style={{padding: 0, width, zIndex: 2}}
                className={fixedHeader ? styles.fixedHeader : ''}
            >
                {isTop && !isMobile ? (
                    <TopNavHeader
                        theme={navTheme}
                        mode="horizontal"
                        onCollapse={handleMenuCollapse}
                        onNoticeClear={this.handleNoticeClear}
                        onMenuClick={this.handleMenuClick}
                        onNoticeVisibleChange={this.handleNoticeVisibleChange}
                        {...this.props}
                    />
                ) : (
                    <GlobalHeader
                        onCollapse={handleMenuCollapse}
                        onNoticeClear={this.handleNoticeClear}
                        onMenuClick={this.handleMenuClick}
                        onNoticeVisibleChange={this.handleNoticeVisibleChange}
                        {...this.props}
                    />
                )}
            </Header>
        ) : null;
        return (
            <Animate component="" transitionName="fade">
                {HeaderDom}
            </Animate>
        );
    }
}

export default HeaderView;
