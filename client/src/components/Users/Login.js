import React, { Component } from 'react';
import { connect } from "react-redux"
import { login } from '../../data/users/userActions'
import Message from '../Extra/Message';
import "./style.css"

class Login extends Component {

    constructor(props) {
        super(props)
        this.userNameInput = React.createRef()
        this.passwordInput = React.createRef()

    }

    componentDidMount() {
        this.userNameInput.current.focus()
    }

    handleLogIn(event) {
        event.preventDefault()
        const user_name = this.userNameInput.current.value;
        const password = this.passwordInput.current.value;
        const userToLogIn = {
            user_name,
            password,
        }
        this.props.onLogIn(userToLogIn)
    }

    render() {

        return (
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-6 mx-auto">
                        <div className="jumbotron">
                        <h2 className="welcome-p">Welcome to our Agency!! </h2>
                        <br /> 
                        <h5 className="text-center"> Our agency is known with its best offers and best services, Enjoy visiting :-) </h5>
                            <br /> 
                            <Message />
                            <form action="/users/login" method="POST" onSubmit={(event) => this.handleLogIn(event)}>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Username..." ref={this.userNameInput} required={true} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="password" placeholder="Password..." ref={this.passwordInput} required={true} />
                                </div>
                                <br /> 
                                <br /> 
                                <br /> 

                                <div className="d-grid gap-2">
                                    <input className="btn btn-primary" type="submit" value="Login" />
                                    <a className="btn btn-outline-dark" href="/register" role="button">A new user ? Register here</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (user) => dispatch(login(user)),
    }
}

export default connect(null, mapDispatchToProps)(Login);