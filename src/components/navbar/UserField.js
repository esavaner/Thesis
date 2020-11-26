import React from 'react';
import { Link } from 'react-router-dom';
import './UserField.css';

import { logout } from '../../helpers/auth/service';


class UserField extends React.Component {
    logoutUser = () => {
        logout();
    }
    render() {
        return (
            <div>
                <span>Photo</span>
                <span>Username</span>
                <button>Profile</button>
                <Link to='/login'><button onClick={this.logoutUser}>Logout</button></Link>
            </div>
        )
    }
}

export default UserField