import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import './Home.css';
import '../../global.css';

import Game from '../game/Game';
import Room from '../room/Room';

class Home extends React.Component {

    render() {
        return (
            <Switch>
                <Route path='/h/g/:room'>
                    <Game theme={this.props.theme}></Game>
                </Route>
                <Route path='/h/c'>
                    <Room theme={this.props.theme}></Room>
                </Route>
                <Route path='/h/g'>
                    <Redirect to='/h/c'></Redirect>
                </Route>
                <Route path='/h'>
                    <Link to='/h/c'>
                        <button>Create Game</button>
                    </Link>
                </Route>
            </Switch>
        );
    }
}

export default Home;