import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../helpers/auth/service';

import './Navbar.css';
import '../../globalColors.css';

import UserField from './UserField'
import LoginField from './LoginField'

function Field(props) {
    let user = getUser();
    if (user) 
        return <UserField/>

    return <LoginField/>
}

class Navbar extends React.Component {
    render() {
        return (
            <div className={"nav " + ((this.props.navActive) ? "activeNav" : "inactiveNav") + " " + this.props.theme + "2"}>
                <Link to="/">Home</Link>
                <Link to="/repos">Repos</Link>
                <Field/>
            </div>
        );
    }
}



export default Navbar;