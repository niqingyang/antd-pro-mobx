import {observable, action} from 'mobx/lib/mobx';
import {namespace} from 'mobx-react-stores';

@namespace
class Counter {

    @observable
    value = 0;

    @action
    increment = () => {
        this.value += 1;
    }

    @action
    decrement = () => {
        this.value -= 1;
    }
}

export default new Counter();
