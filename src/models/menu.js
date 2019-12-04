import {action, observable} from "mobx";
import {namespace, stores} from "mobx-react-stores";
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Authorized from '../utils/Authorized';
import {menu} from '../default.setting';

const {check} = Authorized;

/**
 * 格式化菜单数据
 * @param data 路由数据
 * @param parentAuthority 上级路由所要求的权限
 * @param parentName 上级路由的名称
 * @returns {Array}
 */
function formatter(data, parentAuthority, parentName) {
    if (!data) {
        return undefined;
    }

    return data
        .map(item => {
            if (!item.name || !item.path) {
                return null;
            }

            let locale = 'menu';
            if (parentName && parentName !== '/') {
                locale = `${parentName}.${item.name}`;
            } else {
                locale = `menu.${item.name}`;
            }

            const name = menu.disableLocal
                ? item.name
                : stores.intl.formatMessage({id: locale, defaultMessage: item.name});

            const result = {
                ...item,
                name,
                locale,
                authority: item.authority || parentAuthority,
            };

            if (item.routes) {
                const children = formatter(item.routes, result.authority, locale);
                // Reduce memory usage
                result.children = children;
            }
            delete result.routes;
            return result;
        })
        .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children), // eslint-disable-line
        };
    }
    return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return [];
    }
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => check(item.authority, getSubMenu(item)))
        .filter(item => item);
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
    if (!menuData) {
        return {};
    }
    const routerMap = {};

    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children) {
                flattenMenuData(menuItem.children);
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

@namespace("menu")
class Menu {

    @observable
    routerData = []

    @observable
    menuData = []

    @observable
    breadcrumbNameMap = {}

    /**
     *
     * @param routes 子路由集合
     * @param authority 上级权限
     * @param path 当前路径
     */
    getMenuData = ({routes, authority, path}) => {

        const originalMenuData = memoizeOneFormatter(routes, authority, path);

        const menuData = filterMenuData(originalMenuData);

        const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

        this.save({
            menuData,
            breadcrumbNameMap,
            routerData: routes
        });
    }

    @action
    save = ({menuData, breadcrumbNameMap, routerData}) => {
        this.menuData = menuData;
        this.breadcrumbNameMap = breadcrumbNameMap;
        this.routerData = routerData;
    }
}

export default new Menu();