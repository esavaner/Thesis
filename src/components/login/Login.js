import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import history from '../../helpers/history';

import './Login.css';
import '../../globalColors.css';
import service from '../../helpers/auth/service';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    checkUser = () => {
        let user = service.getUser();
        if (user)
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
        service.login(this.state).then(
            (data) => {
                history.push('/');
            },
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div>
                {this.checkUser() &&
                    <Redirect to='/'></Redirect>
                }
                <Link to='/home'><button>X</button></Link>
                <div>
                    <form onSubmit={this.handleLogin}>
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
                            <button type='submit'>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



export default Login;