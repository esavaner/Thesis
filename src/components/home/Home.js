import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import './Home.css';
import '../../globalColors.css';

import Game from '../game/Game';
import Room from '../room/Room';

class Home extends React.Component {

    render() {
        return (
            <Switch>
                <Route path='/home/game/:room'>
                    <Game theme={this.props.theme}></Game>
                </Route>
                <Route path='/home/create'>
                    <Room theme={this.props.theme}></Room>
                </Route>
                <Route path='/home/game'>
                    <Redirect to='/home/create'></Redirect>
                </Route>
                <Route path='/home'>
                    <Link to='/home/create'>
                        <button>Create Game</button>
                    </Link>
                </Route>
            </Switch>
        );
    }
}

export default Home;