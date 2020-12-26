import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProfile } from '../../helpers/service';

import './Profile.css';


class ProfileWithParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            elo: 0,
            highest: 0,
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
                console.log(resp)
                this.setState({
                    username: resp.user.username,
                    elo: resp.user.elo,
                    highest: resp.user.highest,
                    won: resp.user.won,
                    lost: resp.user.lost,
                    stalemate: resp.user.stalemate,
                    win_ratio: resp.user.win_ratio.toFixed(1),
                    total: resp.user.total,
                    games: resp.games
                })
            },
            (err) => console.log(err)
        )
    }

    render() {
        let history = this.state.games.reverse().map((game, i) => {
            let pl = this.state.username === game.player1 ? 1 : 2;
            let opp = this.state.username === game.player1 ? 2 : 1;
            let res = 'stale';
            if (game.winner) {
                if (game.winner === game['player' + pl]) res = 'won';
                if (game.winner === game['player' + opp]) res = 'lost';
            }
            let score = game['after'+pl] - game['before'+pl] > 0 ? <span className='won'>+{game['after'+pl] - game['before'+pl]}</span> : <span className='lost'>{game['after'+pl] - game['before'+pl]}</span>;
            return  <tr key={i}>
                        <td className='mark'><div className={'col ' + res}></div></td>
                        <td><small>vs</small> {game['player' + opp] || 'Anonymous'}</td>
                        <td>{game['after'+pl]} <small>({score}) points</small></td>
                        <td>{game.played}</td>
                        <td><Link to={'/h/w/' + game.id}><small>watch</small> <FontAwesomeIcon icon='external-link-alt'/></Link></td>
                    </tr>;
        });
        return (
            <>
                <div className='over'>Overview</div>
                <div className='profile'>
                    <div className='left'>
                        <span>{this.state.username}</span>
                    </div>
                    <div className='right'>
                        <div className='elo'>{this.state.elo} Points</div>
                        <div className='highest'>{this.state.highest} Highest</div>
                    </div>
                    <div className='stats'>
                        <div>Win ratio<br/><span className={this.state.win_ratio >= 50 ? 'gr' : 'rd'}>{this.state.win_ratio}%</span></div>
                        <div>Games played<br/><span>{this.state.total}</span></div>
                        <div>Stalemates<br/><span>{this.state.stalemate}</span></div>
                    </div>
                </div>
                <div className='over'>Recent games</div>
                <div className={this.props.theme + '2 games'}>
                    <div className='history'>
                        <table>
                            <tbody>
                                {history}
                            </tbody>
                        </table>
                    </div>
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