import React from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../helpers/service';

import './Profile.css';


class ProfileWithParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            elo: 0,
            won: 0,
            lost: 0,
            stalemate: 0,
            win_ratio: 0,
            total: 0,
            games: []
        }
    }

    componentDidMount() {
        getProfile(this.props.user).then(
            (resp) => {
                this.setState({
                    username: resp.user.username,
                    elo: resp.user.elo,
                    won: resp.user.won,
                    lost: resp.user.lost,
                    stalemate: resp.user.stalemate,
                    win_ratio: resp.user.win_ratio.toFixed(1),
                    total: resp.user.total
                })
            },
            (err) => console.log(err)
        )
    }

    render() {
        return (
            <>
                <div className='profile'>
                    <span>{this.state.username}</span>
                    <span>{this.state.elo}</span>
                    <span>{this.state.won}</span>
                    <span>{this.state.lost}</span>
                    <span>{this.state.stalemate}</span>
                    <span>{this.state.win_ratio}</span>
                    <span>{this.state.total}</span>
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