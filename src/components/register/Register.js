import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../helpers/history';

import './Register.css';
import '../../globalColors.css';
import { register } from '../../helpers/auth/service';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = (e) => {
        if (this.state.password !== this.state.cpassword) {
            console.log('Passwords dont match');
            return;
        }
        e.preventDefault();
        register({username: this.state.username, email: this.state.email, password: this.state.password}).then(
            (data) => {
                history.push('/login');
            },
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div>
                <Link to='/home'><button>X</button></Link>
                <div>
                    <form onSubmit={this.handleRegister}>
                        <div>
                            <label>
                                Username
                            </label>
                            <input type='text' name='username' value={this.state.value} onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label>
                                Email
                            </label>
                            <input type='email' name='email' value={this.state.value} onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label>
                                Password
                            </label>
                            <input type='password' name='password' value={this.state.value} onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label>
                                Confirm Password
                            </label>
                            <input type='password' name='cpassword' value={this.state.value} onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <button type='submit'>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



export default Register;