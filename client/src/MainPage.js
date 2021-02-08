import React, { Component } from 'react';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import HomePage from './components/Extra/HomePage';


class MainPage extends Component {

    render() {
        const path = window.location.pathname
        const { user } = this.props

        return (
            <div>
                <Router>
                {!user && !path.endsWith('/login') && !path.endsWith('/chart') && !path.endsWith('/register')
                    &&
                    <Redirect to="/login" />
                }
                {user &&
                    <Redirect push to="/homepage" />}
                <Switch>
                    <Route path="/homepage" component={HomePage} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
                </Router>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.currentUser,
    }
}

export default connect(mapStateToProps, null)(MainPage);