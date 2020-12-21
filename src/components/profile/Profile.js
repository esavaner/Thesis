import React from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../helpers/auth/service';

import './Profile.css';


class ProfileWithParams extends React.Component {
    constructor(props) {
        super(props);
        let u = getUser();
        this.state = {
            games: [],
            user: u.username
        }
    }

    render() {
        return (
            <>
                <div className='profile'>
                    {this.state.user}
                </div>
                <div className={this.props.theme + '2 games'}>
                    <h2>Games</h2>
                </div>
            </>
        )
    }
}

function withUseParams(Component) {
    return function({theme}) {
        const { user } = useParams();
        return <Component {...{theme, user}}/>
    }
}

const Profile = withUseParams(ProfileWithParams);

export default Profile;