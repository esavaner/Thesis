import React from 'react';
import { Link } from 'react-router-dom';
import './UserField.css';
import './Navbar.css';

import { logout, getUser } from '../../helpers/auth/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class UserField extends React.Component {
    logoutUser = () => {
        logout();
    }
    render() {
        return (
            <>
                <div className='tile'>
                    <Link to={'/h/p/' + getUser().username}>
                        <div className='icon'>
                            <FontAwesomeIcon icon='user'/>
                        </div>
                        <div className='txt'>
                            Profile
                        </div>
                    </Link>
                </div>
                <div className='tile'>
                    <Link to='/login' onClick={this.logoutUser}>
                        <div className='icon'>
                            <FontAwesomeIcon icon='sign-out-alt'/>
                        </div>
                        <div className='txt'>
                            Sign out
                        </div>
                    </Link>
                </div>
            </>
        )
    }
}

export default UserField