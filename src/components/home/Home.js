import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import './Home.css';
import '../../global.css';

import BotGame from '../game/BotGame';
import Game from '../game/Game';
import Room from '../room/Room';
import Main from '../main/Main';
import Profile from '../profile/Profile';

class Home extends React.Component {

    render() {
        return (
            <Switch>
                <Route path='/h/c'>
                    <Room theme={this.props.theme}></Room>
                </Route>
                <Route path='/h/g/:room'>
                    <Game theme={this.props.theme}></Game>
                </Route>
                <Route path='/h/g'>
                    <Redirect to='/h/c'></Redirect>
                </Route>
                <Route path='/h/b'>
                    <BotGame theme={this.props.theme}></BotGame>
                </Route>
                <Route path='/h/p/:user'>
                    <Profile theme={this.props.theme}></Profile>
                </Route>
                <Route path='/h/p'>
                    <Redirect to='/login'></Redirect>
                </Route>
                <Route path='/h'>
                    <Main theme={this.props.theme}></Main>
                </Route>
            </Switch>
        );
    }
}

export default Home;