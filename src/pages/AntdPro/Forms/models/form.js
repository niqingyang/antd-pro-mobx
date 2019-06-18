import {action} from 'mobx';
import {namespace, stores} from 'mobx-react-stores';
import {message} from 'antd';
import {fakeSubmitForm} from '@/services/api';

const {routing} = stores;

@namespace
class Form {
    step = {
        payAccount: 'ant-design@alipay.com',
        receiverAccount: 'test@example.com',
        receiverName: 'Alex',
        amount: '500',
    }

    submitRegularForm = async (payload) => {
        await fakeSubmitForm(payload);
        message.success('提交成功');
    }

    submitStepForm = async (payload) => {
        await fakeSubmitForm(payload);
        this.saveStepFormData(payload);
        routing.push('/antd-pro/form/step-form/result');
    }

    submitAdvancedForm = async (payload) => {
        await fakeSubmitForm(payload);
        message.success('提交成功');
    }

    saveStepFormData = (payload) => {
        this.step = {...payload};
    }
}

export default new Form();
