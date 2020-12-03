import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import history from '../../helpers/history';

import './Login.css';
import '../../global.css';
import { login, register, getUser } from '../../helpers/auth/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: true,
            email: '',
            password: '',
            r_username: '',
            r_email: '',
            r_password: '',
            r_cpassword: ''
        }
    }

    checkUser = () => {
        let user = getUser();
        if (user && user.username)
            return true
        return false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        login({email: this.state.email, password: this.state.password}).then(
            (data) => {
                history.push('/');
            },
            (error) => {
                console.log(error);
            }
        )
    }

    handleRegister = (e) => {
        if (this.state.r_password !== this.state.r_cpassword) {
            console.log('Passwords dont match');
            return;
        }
        e.preventDefault();
        register({username: this.state.r_username, email: this.state.r_email, password: this.state.r_password}).then(
            (data) => {
                history.push('/');
            },
            (error) => {
                console.log(error);
            }
        )
    }

    sw = () => {
        this.setState({
            mode: !this.state.mode
        });
    }

    swapSt = () => {
        this.sw();
    }

    render() {
        return (
            <div className='page'>
                {this.checkUser() &&
                    <Redirect to='/'></Redirect>
                }
                <div className={'container ' + (this.state.mode ? '' : 'swap')}>    
                    <div className='container-overlay'>
                        <div className='overlay'>
                            <div className='panel first'>
                                <h1>Welcome back</h1>
                                <FontAwesomeIcon icon='chess' size='3x'></FontAwesomeIcon>
                                <p>New here? Create an account</p>
                                <button onClick={this.swapSt}>Register</button>
                                <Link to='/h'>Back to main page</Link>
                            </div>
                            <div className='panel second'>
                                <h1>Hello newcomer</h1>
                                <FontAwesomeIcon icon='chess-board' size='3x'></FontAwesomeIcon>
                                <p>Already have an account?</p>
                                <button onClick={this.swapSt}>Login</button>
                                <Link to='/h'>Back to main page</Link>
                            </div>
                        </div>
                    </div>   
                    <div className='container-form register'>
                        <form onSubmit={this.handleRegister}>
                            <label>Username</label>
                            <input type='text' name='r_username' value={this.state.value} onChange={this.handleChange}></input>
                            <label>Email</label>
                            <input type='email' name='r_email' value={this.state.value} onChange={this.handleChange}></input>
                            <label>Password</label>
                            <input type='password' name='r_password' value={this.state.value} onChange={this.handleChange}></input>
                            <label>Confirm Password</label>
                            <input type='password' name='r_cpassword' value={this.state.value} onChange={this.handleChange}></input>
                            <button type='submit'>Sign up</button>
                        </form>
                    </div>
                    <div className='container-form login'>
                        <form onSubmit={this.handleLogin}>
                            <label>Email</label>
                            <input type='email' name='email' value={this.state.value} onChange={this.handleChange}></input>
                            <label>Password</label>
                            <input type='password' name='password' value={this.state.value} onChange={this.handleChange}></input>
                            <Link to='/h'>Forgot password?</Link>
                            <button type='submit'>Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}



export default Login;