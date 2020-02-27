import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './History';
import App from '../Components/App'

class AppRouter extends Component {

    render() {
        return (
        <Router history={history} >
            <Switch >
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </Router>
        )
    }
}

export default AppRouter