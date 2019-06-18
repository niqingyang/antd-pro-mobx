import {action, observable} from "mobx";
import {namespace, loading} from 'mobx-react-stores';
import {queryActivities} from '@/services/api';

@namespace
class Activities {

    list = []

    @loading
    fetchList = () => {
        return queryActivities().then((response) => {
            this.list = Array.isArray(response) ? response : [];
        });
    }
}

export default new Activities();

