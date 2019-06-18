import {observable, action} from "mobx/lib/mobx";
import {namespace} from "mobx-react-stores";
import {queryNotices} from "../services/api";
import user from "./user";

// 改变消息数量
function changeNotifyCount(notices) {

    const unreadCount = notices.filter(item => !item.read).length;

    const notifyCount = notices.length;

    user.changeNotifyCount({
        // 消息数量
        notifyCount,
        // 未读消息的数量
        unreadCount,
    });
}

@namespace
class Global {

    @observable
    collapsed = false;

    @observable
    notices = [];

    @action
    changeLayoutCollapsed = ({collapsed}) => {
        this.collapsed = collapsed;
    }

    @action
    fetchNotices = async () => {

        const response = await queryNotices();

        this.notices = response;

        changeNotifyCount(this.notices);
    }

    /**
     * 清空指定类型的消息
     * @param type
     */
    @action
    clearNotices = (type) => {

        this.notices = this.notices.filter(item => item.type !== type);

        changeNotifyCount(this.notices);
    }

    /**
     * 改变消息的已读状态
     * @param id
     */
    @action
    changeNoticeReadState = (id) => {
        this.notices = this.notices.map(item => {
            const notice = {...item};
            if (notice.id === id) {
                notice.read = true;
            }
            return notice;
        });

        changeNotifyCount(this.notices);
    }
}

export default new Global();