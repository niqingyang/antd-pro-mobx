import {action, observable} from 'mobx';
import {namespace, loading} from 'mobx-react-stores';
import {queryProvince, queryCity} from '@/services/geographic';

@namespace("geographic")
class Geographic {

    @observable
    province = []

    @observable
    city = []

    @observable
    isLoading = false

    fetchProvince = async () => {
        this.changeLoading(true);

        const response = await queryProvince();

        this.setProvince(response);

        this.changeLoading(false);
    }

    fetchCity = async (payload) => {

        this.changeLoading(true);

        const response = await queryCity(payload);

        this.setCity(response);

        this.changeLoading(false);
    }

    @action
    setProvince = (payload) => {
        this.province = payload;
    }

    @action
    setCity = (payload) => {
        this.city = payload;
    }

    @action
    changeLoading = (isLoading) => {
        this.isLoading = isLoading;
    }

}

export default new Geographic();