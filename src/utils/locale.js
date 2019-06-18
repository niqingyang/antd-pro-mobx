import {stores} from 'mobx-react-stores';

export const {intl, locale} = stores;

export function formatMessage(props) {
    return intl.formatMessage(props);
}

export function setLocale(lang) {
    if (lang !== undefined && !/^([a-z]{2})-([A-Z]{2})$/.test(lang)) {
        // for reset when lang === undefined
        throw new Error('setLocale lang format error');
    }
    if (getLocale() !== lang) {
        locale.change(lang);
        window.location.reload();
    }
}

export function getLocale() {
    return locale.lang;
}

