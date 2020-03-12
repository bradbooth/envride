import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Header from "../Components/Header/Header"
import history from './History';
import App from '../Components/App'

class AppRouter extends Component {

    render() {
        return (
            <div>
                <Header />
                <Router history={history} >
                    <Switch >
                        <Route path="/">
                            <App />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default AppRouter