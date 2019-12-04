import {observable, action, toJS} from "mobx";
import {namespace} from "mobx-react-stores";
import {loading} from "mobx-loading";
import {queryCurrent} from '../services/user';

@namespace("user")
class User {

    // 当前用户
    @observable
    currentUser;

    constructor() {
        this.changeCurrentUser({
            notifyCount: 0,
            unreadCount: 0
        });
    }

    // 初始化函数
    init = (config) => {

    }

    @loading
    @action
    fetchCurrent = async () => {
        return queryCurrent().then((response)=>{
            this.changeCurrentUser(response);
        });
    }

    @action
    changeCurrentUser = (user) => {
        this.currentUser = user;
    }

    @action
    changeNotifyCount = (payload) => {
        this.currentUser = {
            ...this.currentUser,
            // 消息数量
            notifyCount: payload.notifyCount,
            // 未读消息的数量
            unreadCount: payload.unreadCount,
        }
    }

}

export default new User();