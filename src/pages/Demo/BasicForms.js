import React, {PureComponent} from 'react';
import {autorun, extendObservable, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {FormattedMessage} from 'react-intl';
import {Form as AntdForm, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip} from 'antd';
import Form from 'antd-form-plus';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const FormField = Form.Field;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@inject(({stores: {dispatch, loading, intl: {formatMessage}, demo}}) => ({
    dispatch,
    demo,
    formatMessage,
    submitting: loading.actions['form/submitRegularForm'],
}))
@Form.create({
    mapPropsToFields: ({demo}) => {
        return Object.entries(demo.fields).reduce((acc, [name, field])=>{
            return {
                ...acc,
                [name]: Form.createFormField(field)
            }
        }, {});
    },
    fields: ({demo}) => demo.fields
})
@observer
class BasicForms extends React.Component {

    @observable
    model = null

    componentWillMount = () => {
        const {demo} = this.props;
    }

    handleSubmit = e => {
        const {dispatch, form} = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };

    handleClick = e => {
        const {demo, form} = this.props;

        form.validateFields((errors, values) => {
            console.log(errors, values)
        })

        demo.fields.title.count += 1;
        console.log('demo.fields.title', demo.fields.title);
    }

    handleClickOther = e => {
        const {demo} = this.props;

        demo.fields.title = {
            ...demo.fields.title,
            value: '初始值',
            count: 0,
            errors: undefined,
            rules: []
        }
    }

    render() {
        const {submitting, formatMessage, form, demo} = this.props;
        const {
            form: {getFieldDecorator, getFieldValue},
        } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 7},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
                md: {span: 10},
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 10, offset: 7},
            },
        };

        return (
            <PageHeaderWrapper
                title={<FormattedMessage id="app.forms.basic.title"/>}
                content={<FormattedMessage id="app.forms.basic.description"/>}
            >
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>
                        <FormItem {...formItemLayout} field={form.get('title')} label={demo.fields.title.value}>
                            <FormField field={form.get('title')}>
                                <Input/>
                            </FormField>
                            <Button onClick={this.handleClick}>点击</Button>
                            <Button onClick={this.handleClickOther}>归零</Button>
                        </FormItem>
                        <FormItem {...formItemLayout} field={form.get('date')}>
                            <FormField field={form.get('date')}>
                                <RangePicker
                                    style={{width: '100%'}}
                                    placeholder={[
                                        formatMessage({id: 'form.date.placeholder.start'}),
                                        formatMessage({id: 'form.date.placeholder.end'}),
                                    ]}
                                />
                            </FormField>
                        </FormItem>
                        <FormItem {...formItemLayout} field={form.get('goal')}>
                            <FormField field={form.get('goal')}>
                                <TextArea
                                    style={{minHeight: 32}}
                                    placeholder={formatMessage({id: 'form.goal.placeholder'})}
                                    rows={4}
                                />
                            </FormField>
                        </FormItem>
                        <FormItem {...formItemLayout} field={form.get('standard')}>
                            <FormField field={form.get('standard')}>
                                <TextArea
                                    style={{minHeight: 32}}
                                    placeholder={formatMessage({id: 'form.standard.placeholder'})}
                                    rows={4}
                                />
                            </FormField>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            field={form.get('client')}
                            label={
                                <span>
                                    <FormattedMessage id="form.client.label"/>
                                    <em className={styles.optional}>
                                        <FormattedMessage id="form.optional"/>
                                        <Tooltip title={<FormattedMessage id="form.client.label.tooltip"/>}>
                                            <Icon type="info-circle-o" style={{marginRight: 4}}/>
                                        </Tooltip>
                                    </em>
                                </span>
                            }
                        >
                            <FormField field={form.get('client')}>
                                <Input placeholder={formatMessage({id: 'form.client.placeholder'})}/>
                            </FormField>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={
                                <span>
                                    <FormattedMessage id="form.invites.label"/>
                                    <em className={styles.optional}>
                                        <FormattedMessage id="form.optional"/>
                                    </em>
                                </span>
                            }
                        >
                            <FormField field={form.get('invites')}>
                                <Input placeholder={formatMessage({id: 'form.invites.placeholder'})}/>
                            </FormField>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={
                                <span>
                                    <FormattedMessage id="form.weight.label"/>
                                    <em className={styles.optional}>
                                        <FormattedMessage id="form.optional"/>
                                    </em>
                                </span>
                            }
                        >
                            <FormField field={form.get('weight')}>
                                <InputNumber
                                    placeholder={formatMessage({id: 'form.weight.placeholder'})}
                                    min={0}
                                    max={100}
                                />
                            </FormField>
                            <span className="ant-form-text">%</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="form.public.label"/>}
                            help={<FormattedMessage id="form.public.label.help"/>}
                        >
                            <div>
                                <FormField field={form.get('public')}>
                                    <Radio.Group>
                                        <Radio value="1">
                                            <FormattedMessage id="form.public.radio.public"/>
                                        </Radio>
                                        <Radio value="2">
                                            <FormattedMessage id="form.public.radio.partially-public"/>
                                        </Radio>
                                        <Radio value="3">
                                            <FormattedMessage id="form.public.radio.private"/>
                                        </Radio>
                                    </Radio.Group>
                                </FormField>
                                <FormItem style={{marginBottom: 0}}>
                                    <FormField field={form.get('publicUsers')}>
                                        <Select
                                            mode="multiple"
                                            placeholder={formatMessage({id: 'form.publicUsers.placeholder'})}
                                            style={{
                                                margin: '8px 0',
                                                display: getFieldValue('public') === '2' ? 'block' : 'none',
                                            }}
                                        >
                                            <Option value="1">
                                                <FormattedMessage id="form.publicUsers.option.A"/>
                                            </Option>
                                            <Option value="2">
                                                <FormattedMessage id="form.publicUsers.option.B"/>
                                            </Option>
                                            <Option value="3">
                                                <FormattedMessage id="form.publicUsers.option.C"/>
                                            </Option>
                                        </Select>
                                    </FormField>
                                </FormItem>
                            </div>
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                <FormattedMessage id="form.submit"/>
                            </Button>
                            <Button style={{marginLeft: 8}}>
                                <FormattedMessage id="form.save"/>
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default BasicForms;
