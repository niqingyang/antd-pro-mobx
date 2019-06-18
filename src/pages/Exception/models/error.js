import {action, observable} from "mobx";
import {namespace} from 'mobx-react-stores';
import queryError from '@/services/error';

@namespace
class Error {
    @observable
    error = ''

    query = async ({code}) => {
        const response = await queryError(code);
        this.trigger(response);

    }

    @action
    trigger = (error) => {
        this.error = error;
    }
}

export default new Error();
