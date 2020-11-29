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
                <div className='logo'>
                    <FontAwesomeIcon icon='chess' size='3x'/>
                </div>
                <div className='tile'>
                    <Link to='/'>
                        <div className='icon'>
                            <FontAwesomeIcon icon='home'/>
                        </div>
                        <div className='txt'>
                            Home
                        </div>
                    </Link>
                </div>
                <div className='tile'>
                    <Link to='/h/c'>
                        <div className='icon'>
                            <FontAwesomeIcon icon='chess-knight'/>
                        </div>
                        <div className='txt'>
                            Play
                        </div>
                    </Link>
                </div>
                <div className='tile'>
                    <Link to='/h/r'>
                        <div className='icon'>
                            <FontAwesomeIcon icon='medal'/>
                        </div>
                        <div className='txt'>
                            Ranking
                        </div>
                    </Link>
                </div>
                <div className='tile'>
                    <Link to='/h/s'>
                        <div className='icon'>
                            <FontAwesomeIcon icon='cog'/>
                        </div>
                        <div className='txt'>
                            Settings
                        </div>
                    </Link>
                </div>
                <div className='tile'>
                    <Field/>
                </div>
            </div>
        );
    }
}



export default Navbar;