import React from 'react';
import {inject, observer, Provider} from "mobx-react";
import {Row, Col, Slider, Button} from 'antd';
import {intl} from '@/utils/locale'

@inject(({stores: {routing, locale}}) => {
    return {
        locale,
        routing
    }
})
@observer
class HistoryDemo extends React.Component {


    render() {

        const {routing, history, locale} = this.props;

        console.log(intl.formatMessage({id: 'app.analysis.sales-ranking'}));

        // locale.change('en-US');

        return (
            <div>
                <Row>
                    <Col span={2}>
                        <Button type="primary" onClick={() => routing.go(-1)}>routing.go</Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={() => routing.goBack()}>routing.goBack</Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={() => routing.goForward()}>routing.goForward</Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={() => routing.push('/demo/counter')}>routing.push</Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={() => routing.replace('/demo/random-user')}>routing.replace</Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={() => console.log(intl.formatMessage({id: 'app.analysis.sales-ranking'}))}>{intl.formatMessage({id: 'app.analysis.sales-ranking'})}</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HistoryDemo;