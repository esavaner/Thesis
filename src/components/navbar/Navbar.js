import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../helpers/service';

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

    changeCol = (colorButton) => {
        this.props.changeColor(colorButton.target.value)
    }

    render() {
        return (
            <div className={'nav ' + ((this.props.nav) ? 'active' : 'inactive') + ' ' + this.props.theme + '2'}>
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
                            vs Player
                        </div>
                    </Link>
                </div>
                <div className='tile'>
                    <Link to='/h/b'>
                        <div className='icon'>
                            <FontAwesomeIcon icon='graduation-cap'/>
                        </div>
                        <div className='txt'>
                            vs Bot
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
                <Field/>
                <div className='tile'>
                    <button className='drk' onClick={this.changeCol} value="dark"></button>
                    <button className='lgh' onClick={this.changeCol} value="light"></button>
                </div>
            </div>
        );
    }
}



export default Navbar;