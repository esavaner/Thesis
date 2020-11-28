import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../helpers/auth/service';

import './Navbar.css';
import '../../global.css';

import UserField from './UserField';
import LoginField from './LoginField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Field(props) {
    let user = getUser();
    if (user && user.username) 
        return <UserField/>

    return <LoginField/>
}

class Navbar extends React.Component {
    render() {
        return (
            <div className={'nav ' + ((this.props.navActive) ? 'activeNav' : 'inactiveNav') + ' ' + this.props.theme + '2'}>

                <Link to='/'>
                    <span>
                        <FontAwesomeIcon icon='home'/>
                    </span>
                    Home
                </Link>

                
                <Link to='/repos'>Repos</Link>
                <Field/>
            </div>
        );
    }
}



export default Navbar;