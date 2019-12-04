import {action, computed, observable, trace} from "mobx";
import invariant from 'invariant';
import {namespace} from 'mobx-react-stores';

const LOCALE = "locale";

@namespace("locale")
class Locale {
    @observable
    lang

    @observable
    translations

    constructor(defaultLang, translations) {

        this.translations = translations

        if (typeof localStorage !== "undefined") {
            const storedLocale = localStorage.getItem(LOCALE)
            if (translations && storedLocale && storedLocale in translations) {
                this.lang = storedLocale;
            } else {
                this.lang = defaultLang;
            }
        } else {
            this.lang = defaultLang;
        }
    };

    @action
    change = (lang) => {

        // 检查 translations 是否初始化
        invariant(this.translations, `[stores.locale] translations not init`);

        // 检查 lang 是否在 translations 中定义
        invariant(lang in this.translations, `${lang} not found in locale translations list`);

        if (this.translations && lang in this.translations) {
            this.lang = lang;
            if (typeof localStorage !== "undefined") {
                localStorage.setItem(LOCALE, this.lang);
            }
            return true;
        }

        return false;
    }

    @computed
    get translation() {

        if (!(this.lang in this.translations)) {
            console.warn(`${this.lang} not found in locale translations list`)
            return {};
        }

        return this.translations[this.lang];
    }
}

export default Locale;