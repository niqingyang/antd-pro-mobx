import {action, observable} from "mobx";
import {namespace, stores} from 'mobx-react-stores';
import moment from 'moment';

@namespace("demo")
class Demo {

    @observable
    fields = {
        title: {
            count: 0,
            value: '123',
            label: stores.intl.formatMessage({id: 'form.title.label'}),
            rules: [
                {
                    required: true,
                    message: stores.intl.formatMessage({id: 'validation.title.required'}),
                },
            ],
            errors: [
                {
                    message: '你就是错了'
                }
            ],
            props: {
                placeholder: stores.intl.formatMessage({id: 'form.title.placeholder'})
            }
        },
        date: {
            value: [
                moment('2019-01-01'),
                moment('2019-03-01')
            ],
            label: stores.intl.formatMessage({id: 'form.date.label'}),
            rules: [
                {
                    required: true,
                    message: stores.intl.formatMessage({id: 'validation.date.required'}),
                }
            ]
        },
        goal: {
            label: stores.intl.formatMessage({id: "form.goal.label"}),
            rules: [
                {
                    required: true,
                    message: stores.intl.formatMessage({id: 'validation.goal.required'}),
                },
            ]
        },
        standard: {
            label: stores.intl.formatMessage({id: "form.standard.label"}),
            rules: [
                {
                    required: true,
                    message: stores.intl.formatMessage({id: 'validation.standard.required'}),
                },
            ]
        },
        public: {
            value: '1'
        }
    }
}

export default new Demo();