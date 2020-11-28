import React from 'react';
import { Link } from 'react-router-dom';
import './UserField.css';
import './Navbar.css';

import { logout } from '../../helpers/auth/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class UserField extends React.Component {
    logoutUser = () => {
        logout();
    }
    render() {
        return (
            <Link to='/login' onClick={this.logoutUser}>
                <div className='icon'>
                    <FontAwesomeIcon icon='sign-out-alt'/>
                </div>
                <div className='txt'>
                    Sign out
                </div>
            </Link>
        )
    }
}

export default UserField