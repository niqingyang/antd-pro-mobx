import React from 'react';
import {Route, Switch} from "react-router";
import {observer} from "mobx-react/index";
import BasicLayout from '../../layouts/BasicLayout'
import Analysis from "./Dashboard/Analysis";
import Monitor from "./Dashboard/Monitor";
import Workplace from "./Dashboard/Workplace";

@observer
class AntdPro extends React.Component {
    render() {
        // <Route path="/antd-pro/dashboard/monitor" component={Monitor}/>
        // <Route path="/antd-pro/dashboard/workplace" component={Workplace}/>
        return (
            <BasicLayout {...this.props}>
                <Switch>
                    <Route path="/antd-pro/dashboard/analysis" component={Analysis}/>
                    <Route path="/antd-pro/dashboard/monitor" component={Monitor}/>
                    <Route path="/antd-pro/dashboard/workplace" component={Workplace}/>
                </Switch>
            </BasicLayout>
        );
    }
}

export default AntdPro;