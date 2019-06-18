import {observable, action} from "mobx";
import {namespace, loading} from "mobx-react-stores";
import {queryProjectNotice} from '@/services/api';

@namespace
class Project {

    notice = []

    @loading
    fetchNotice = () => {
        return queryProjectNotice().then((response) => {
            this.notice = Array.isArray(response) ? response : [];
        });
    }
}

export default new Project();
