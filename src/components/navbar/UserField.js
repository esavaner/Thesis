import React from 'react';
import { Link } from 'react-router-dom';
import './UserField.css';

import Service from '../../helpers/auth/service';


class UserField extends React.Component {
    logout = () => {
        Service.logout();
    }
    render() {
        return (
            <div>
                <span>Photo</span>
                <span>Username</span>
                <button>Profile</button>
                <Link to='/login'><button onClick={this.logout}>Logout</button></Link>
            </div>
        )
    }
}

export default UserField