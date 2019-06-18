import pathToRegexp from 'path-to-regexp';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import {stores} from 'mobx-react-stores';
import {menu, title} from '../default.setting';

export const matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
};

const getPageTitle = (pathname, breadcrumbNameMap) => {

    const {intl: {formatMessage}} = stores;

    const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
    if (!currRouterData) {
        return title;
    }

    const pageName = menu.disableLocal
        ? currRouterData.name
        : formatMessage({
            id: currRouterData.locale || currRouterData.name,
            defaultMessage: currRouterData.name,
        });

    return `${pageName} - ${title}`;
};

export default memoizeOne(getPageTitle, isEqual);
