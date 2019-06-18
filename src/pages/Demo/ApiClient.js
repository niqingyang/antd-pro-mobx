import React from 'react';
import {inject, observer} from 'mobx-react'
import {Button, Select, Spin, message} from 'antd';
import axios from 'axios/index';

const apis = [
    {
        name: 'ping',
        url: '/api/ping',
        method: 'GET',
        data: {}
    },
    {
        name: '/api/tags',
        url: '/api/tags',
        method: 'GET',
        data: {}
    },
    {
        name: '/api/users',
        url: '/api/users',
        method: 'GET',
        data: {}
    },
    {
        name: '/api/401',
        url: '/api/401',
        method: 'GET',
        data: {}
    },
    {
        name: '/api/402',
        url: '/api/402',
        method: 'GET',
        data: {}
    },
    {
        name: '/api/403',
        url: '/api/403',
        method: 'GET',
        data: {}
    },
    {
        name: '/api/500',
        url: '/api/500',
        method: 'GET',
        data: {}
    }
];

@observer
class ApiClient extends React.Component {

    state = {
        loading: false,
    }

    handleChange = (value) => {

        this.setState({
            api: apis[value]
        })
    }

    handleRequest = () => {
        const {api} = this.state;

        if (!api) {
            message.error('请选择一个API');
            return;
        }

        this.setState({
            loading: true,
        })

        axios({
            method: api.method,
            url: api.url,
            data: api.data
        }).then((response) => {
            this.setState({
                loading: false,
                response: JSON.stringify(response, null, 4)
            })
        }).catch((error) => {
            message.error(`${error.response.status} ${error.response.statusText}`);
            this.setState({
                loading: false,
                response: JSON.stringify(error.response, null, 4)
            });
        })
    }

    render() {
        const {response, loading} = this.state;

        return (
            <div>
                <div>
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="选择一个API"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                    >
                        {apis.map((item, index) => {
                            return (
                                <Select.Option
                                    key={item.name}
                                    value={index}
                                >
                                    {item.method} {item.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                    <Button type="primary"
                            style={{marginLeft: "10px"}}
                            icon="search"
                            loading={loading}
                            onClick={this.handleRequest}
                    >
                        发起请求
                    </Button>
                </div>
                <Spin spinning={loading}>
                    <pre>
                        {response}
                    </pre>
                </Spin>
            </div>
        );

    }

}

export default ApiClient;