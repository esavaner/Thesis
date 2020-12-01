import React from 'react';
import { Link } from 'react-router-dom';
import './LoginField.css';
import './Navbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginField extends React.Component {
    render() {
        return (
            <Link to='/login' onClick={this.logoutUser}>
                <div className='icon'>
                    <FontAwesomeIcon icon='sign-in-alt'/>
                </div>
                <div className='txt'>
                    Sign in
                </div>
            </Link>
        )
    }
}

export default LoginField