import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../data/users/userActions';


class PageHeader extends Component {

    render() {
        const { user } = this.props

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <div>
                            <div className="navbar-brand"> Vacations Project </div>
                        </div>
                        <div>
                            <div className="pageheader-div">
                                <h5 className="pageheader-h5">
                                    <strong>Welcome</strong> {user.first_name.toUpperCase()} {user.last_name.toUpperCase()}! &nbsp; &nbsp; </h5>
                                <button className="btn btn-light btn-outline-danger" onClick={() => this.props.onLogOut()}> Log Out </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);