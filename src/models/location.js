import {observable, action} from "mobx";

class Location {
    @observable
    pathname

    constructor(config) {
        this.change('/')
    }

    @action
    change = (pathname) => {
        this.pathname = pathname;
    }
}

export default new Location();