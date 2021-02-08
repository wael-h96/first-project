import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../data/users/userActions'
import Message from '../Extra/Message'
import "./style.css"

class Register extends Component {

    constructor(props) {
        super(props);
        this.firstName = React.createRef()
        this.lastName = React.createRef()
        this.userName = React.createRef()
        this.password = React.createRef()
    }

    handleRegister(event) {
        event.preventDefault();
        const first_name = this.firstName.current.value;
        const last_name = this.lastName.current.value;
        const user_name = this.userName.current.value;
        const password = this.password.current.value;
        const userToSendToRegisteration = {
            first_name,
            last_name,
            user_name,
            password,
        };
        this.props.onRegisteration(userToSendToRegisteration)
    }

    render() {
        return (
            <div>
                <div class="container h-100">
                    <div class="row align-items-center h-100">
                        <div class="col-6 mx-auto">
                            <div className="jumbotron">
                                <h2 className="welcome-p">Register a new user</h2>
                                <div className="card-body">
                                    <div>
                                        <Message />
                                        <form action="/users/register" method="POST" onSubmit={(event) => this.handleRegister(event)}>
                                            <div className="form-group">
                                                <label className="col-form-label">First name:</label>
                                                <input className="form-control" type="text" placeholder="Enter Your First Name ..." ref={this.firstName} required={true} />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Last name:</label>
                                                <input className="form-control" type="text" placeholder="Enter Your Last Name ..." ref={this.lastName} required={true} />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Username:</label>
                                                <input className="form-control" type="text" placeholder="Enter A UserName ..." ref={this.userName} required={true} />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Password:</label>
                                                <input className="form-control" type="password" placeholder="Enter A Password ..." ref={this.password} required={true} />
                                            </div>
                                            <div className="d-grid gap-2">
                                                <input className="form-control btn btn-primary" type="submit" value="Register" />
                                                <a className="btn btn-outline-dark" href="/login" role="button">Already have a user ? Log In !</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegisteration: (newUser) => dispatch(register(newUser))
    }
}

export default connect(null, mapDispatchToProps)(Register);