import React from 'react';
import {Route, Switch} from "react-router";
import {inject, observer} from "mobx-react";
import Counter from './Counter';
import RandomUser from "./RandomUser";
import ApiClient from "./ApiClient";
import BasicLayout from '../../layouts/BasicLayout'
import Form from "./BasicForms";

@observer
class Demo extends React.Component {
    render() {
        return (
            <BasicLayout {...this.props}>
                <Switch>
                    <Route path="/demo/random-user" component={RandomUser}/>
                    <Route path="/demo/counter" component={Counter}/>
                    <Route path="/demo/api-client" component={ApiClient}/>
                    <Route path="/demo/form" component={Form}/>
                </Switch>
            </BasicLayout>
        );
    }
}

export default Demo;