import {action, observable} from "mobx";
import {namespace, loading} from 'mobx-react-stores';
import {queryTags} from '@/services/api';

@namespace("monitor")
class Monitor {

    tags = []

    @loading
    fetchTags = async () => {
        const response = await queryTags();
        this.saveTags(response.list);
    }

    saveTags = (tags) => {
        this.tags = tags;
    }
}

export default new Monitor();

