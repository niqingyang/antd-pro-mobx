import {observable, action, toJS} from "mobx";
import {namespace} from "mobx-react-stores";
import {message} from 'antd';
import isMobile from 'ismobilejs';
import defaultSettings from '../default.setting';

let lessNodesAppended;

// 更新主题颜色
const updateTheme = primaryColor => {

    // Don't compile less in production!
    // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    if (process.env.REACT_APP_ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION !== 'site') {
        return;
    }
    // Determine if the component is remounted
    if (!primaryColor) {
        return;
    }
    const hideMessage = message.loading('正在编译主题！', 0);

    function buildIt() {
        if (!window.less) {
            return;
        }
        setTimeout(() => {
            window.less
                .modifyVars({
                    '@primary-color': primaryColor,
                })
                .then(() => {
                    hideMessage();
                })
                .catch((e) => {
                    message.error('Failed to update theme');
                    hideMessage();
                });
        }, 200);
    }

    if (!lessNodesAppended) {
        // insert less.js and color.less
        const lessStyleNode = document.createElement('link');
        const lessConfigNode = document.createElement('script');
        const lessScriptNode = document.createElement('script');
        lessStyleNode.setAttribute('rel', 'stylesheet/less');
        lessStyleNode.setAttribute('href', '/color.less');
        lessConfigNode.innerHTML = `
          window.less = {
            async: true,
            env: 'production',
            javascriptEnabled: true
          };
        `;
        lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
        lessScriptNode.async = true;
        lessScriptNode.onload = () => {
            buildIt();
            lessScriptNode.onload = null;
        };
        document.body.appendChild(lessStyleNode);
        document.body.appendChild(lessConfigNode);
        document.body.appendChild(lessScriptNode);
        lessNodesAppended = true;
    } else {
        buildIt();
    }
};

// 更新色弱模式
const updateColorWeak = colorWeak => {
    document.body.className = colorWeak ? 'colorWeak' : '';
};

@namespace("setting")
class Setting {

    @observable
    navTheme;

    @observable
    primaryColor;

    /**
     * 布局
     * @type {string}
     */
    @observable
    layout;

    @observable
    contentWidth;

    @observable
    fixedHeader;

    @observable
    autoHideHeader;

    @observable
    fixSiderbar;

    @observable
    menu;

    @observable
    title;

    @observable
    pwa;

    // 是否弱视
    @observable
    colorWeak = false;

    /**
     * 是否为手机端
     * @type {boolean}
     */
    @observable
    isMobile = isMobile.any;

    constructor() {
        Object.keys(defaultSettings).forEach((name) => {
            this[name] = defaultSettings[name];
        }, this);
    }

    getSetting = () => {

        const urlParams = new URL(window.location.href);

        Object.keys(this).forEach(key => {
            if (urlParams.searchParams.has(key)) {
                let value = urlParams.searchParams.get(key);

                value = value === '1' ? true : value;

                if (this[key] !== value) {
                    this.changeSetting(key, value);
                }
            }
        });
    }

    @action
    changeSetting = (key, value) => {

        if (typeof this[key] === 'undefined' || this[key] === value) {
            return;
        }

        const urlParams = new URL(window.location.href);

        if (urlParams.searchParams.has(key)) {
            urlParams.searchParams.delete(key);
        }

        if (key !== 'collapse') {
            urlParams.searchParams.set(key, value === true ? 1 : value);
        }

        window.history.replaceState(null, 'setting', urlParams.href);

        if (key === 'primaryColor') {
            // 更新主题
            updateTheme(value);
        } else if (key === 'contentWidth' && window.dispatchEvent) {
            // 更新布局
            window.dispatchEvent(new Event('resize'));
        } else if (key === 'colorWeak') {
            // 更新色弱模式
            updateColorWeak(value);
        } else if (key === 'layout') {
            // 布局
            this.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
        } else if (key === 'fixedHeader' && !value) {
            // 固定顶部
            this.autoHideHeader = false;
        }

        this[key] = value;
    }
}

export default new Setting();