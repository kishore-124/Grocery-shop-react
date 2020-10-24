import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom'

toast.configure();
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            userNameError: "",
            email: "",
            emailError: "",
            phone_number: "",
            password: "",
            passwordError: ""
        }
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handleLoginForm = this.handleLoginForm.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handlePhoneNumberChange(event) {
        this.setState({
            phone_number: event.target.value
        })
    }

    handleUserNameChange(event) {
        this.setState({
            userName: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    validate() {
        let userNameError = "";
        let passwordError = "";

        if (this.state.userName.length < 3) {
            userNameError = "UserName must contain atleast three characters"
        }

        if (userNameError) {
            this.setState({ userNameError });
            return false;
        }

        if (this.state.password.length < 8) {
            passwordError = "Password must contain atleast eight characters"
        }

        if (passwordError) {
            this.setState({ passwordError });
            return false;
        }

        return true;
    }


    handleSubmit(event) {
        event.preventDefault()
        const isValid = this.validate();
        if (isValid) {
            axios.post('http://localhost:8080/register', this.state)
                .then(response => {
                    if(response.status == 200)
                    {
                        this.props.history.push('/login');  
                        toast.error("You must Sign in to continue", { position: toast.POSITION.TOP_CENTER })
                    }
                });
        }
    }
    handleLoginForm() {
        this.props.history.push('/login');
    }
    render() {
        return (
            <div className="login">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        value={this.state.userName}
                        className="form-fields"
                        placeholder="Username"
                        onChange={this.handleUserNameChange}
                    /><div style={{ fontSize: 12, color: "red" }}>
                    {this.state.userNameError}
                  </div>
                    <input type="email"
                        value={this.state.email}
                        className="form-fields"
                        placeholder="Email"
                        onChange={this.handleEmailChange}
                    /><br />
                        <input type="text"
                        value={this.state.phone_number}
                        className="form-fields"
                        placeholder="Phone Number"
                        onChange={this.handlePhoneNumberChange}
                    /><br />
                    <input type="password"
                        value={this.state.password}
                        className="form-fields"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                    /><div style={{ fontSize: 12, color: "red" }}>
                    {this.state.passwordError}
                  </div>

                    <button className="button-register" type="submit">Sign up</button>
                </form>
                <div className="or">OR</div>
                <button className="button-login" type="submit" onClick={this.handleLoginForm}>Log in</button>
            </div>
        )

    }

}
export default withRouter(Register)