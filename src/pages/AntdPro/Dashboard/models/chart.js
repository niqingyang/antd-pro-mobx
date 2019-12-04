import {action, observable} from "mobx";
import {namespace, loading} from 'mobx-react-stores';
import {fakeChartData} from '@/services/api';

@namespace("chart")
class Chart {

    visitData = [];

    visitData2 = [];

    salesData = [];

    searchData = [];

    offlineData = [];

    offlineChartData = [];

    salesTypeData = [];

    salesTypeDataOnline = [];

    salesTypeDataOffline = [];

    radarData = [];

    loading = false;

    @loading
    fetch = () => {
        return fakeChartData().then((response) => {
            Object.keys(this).forEach(key => {
                if (response[key]) {
                    this[key] = response[key];
                }
            })
        });
    }

    @loading
    fetchSalesData = () => {
        return fakeChartData().then((response) => {
            this.salesData = response.salesData;
        });
    }

    @action
    clear = () => {
        Object.assign(this, {
            visitData: [],
            visitData2: [],
            salesData: [],
            searchData: [],
            offlineData: [],
            offlineChartData: [],
            salesTypeData: [],
            salesTypeDataOnline: [],
            salesTypeDataOffline: [],
            radarData: [],
        });
    }
}

export default new Chart();
