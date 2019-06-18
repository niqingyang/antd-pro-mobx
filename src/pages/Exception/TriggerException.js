import React, {PureComponent} from 'react';
import {Button, Spin, Card} from 'antd';
import {observable} from "mobx";
import {inject, observer} from 'mobx-react';
import styles from './style.less';

@inject(({stores: {dispatch}}) => ({
    dispatch
}))
@observer
class TriggerException extends PureComponent {

    @observable
    isLoading = false

    triggerError = code => {

        this.isLoading = true;

        const {dispatch} = this.props;
        
        dispatch({
            type: 'error/query',
            payload: {
                code,
            },
        });
    };

    render() {
        return (
            <Card>
                <Spin spinning={this.isLoading} wrapperClassName={styles.trigger}>
                    <Button type="danger" onClick={() => this.triggerError(401)}>
                        触发401
                    </Button>
                    <Button type="danger" onClick={() => this.triggerError(403)}>
                        触发403
                    </Button>
                    <Button type="danger" onClick={() => this.triggerError(500)}>
                        触发500
                    </Button>
                    <Button type="danger" onClick={() => this.triggerError(404)}>
                        触发404
                    </Button>
                </Spin>
            </Card>
        );
    }
}

export default TriggerException;
