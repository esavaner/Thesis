import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Home.css';
import '../../globalColors.css';

import Game from '../game/Game';

class Home extends React.Component {

    render() {
        return (
            <Switch>
                <Route path='/home/game'>
                    <Game theme={this.props.theme}></Game>
                </Route>
            </Switch>
        );
    }
}

export default Home;