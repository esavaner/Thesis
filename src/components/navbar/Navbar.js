import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import '../../globalColors.css';

import UserField from './UserField'
import LoginField from './LoginField'

function Field(props) {
    if (props.isLoggedIn) 
        return <UserField/>

    return <LoginField/>
}

class Navbar extends React.Component {
    render() {
        return (
            <div className={"nav " + ((this.props.navState.navActive) ? "activeNav" : "inactiveNav") + " " + this.props.navState.colorValue + "2"}>
                <Link to="/home">Home</Link>
                <Link to="/repos">Repos</Link>
                <Field isLoggedIn={this.props.isLoggedIn}/>
            </div>
        );
    }
}



export default Navbar;