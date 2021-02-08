import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHomePage from '../HomePage/admin/AdminHomePage';
import CustomerHomePage from '../HomePage/CustomerHomePage';
import WebSocket, { WebSocketContext } from './WebSocket';
import { Redirect } from 'react-router';

class HomePage extends Component {

    render() {
        const { user } = this.props
        const { role } = this.props;

        let ifAdmin = false;
        if (role === 'admin')
            ifAdmin = true;
        if (!user)
            return <Redirect to="/login" />
        return (
            <div>
                {user &&
                    (ifAdmin ?
                        <AdminHomePage /> :
                        <WebSocketContext.Provider value={new WebSocket()}>
                            <CustomerHomePage />
                        </WebSocketContext.Provider>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        role: state.users.role,
        user: state.users.currentUser
    }
}

export default connect(mapStateToProps, null)(HomePage);