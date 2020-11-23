import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import './globalColors.css';

import history from './helpers/history';

import Navbar from './components/navbar/Navbar';
import NavButton from './components/navbar/NavButton';
import ColorNav from './components/navbar/ColorNav';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';

import { Container } from 'react-bootstrap';

import socket from './helpers/sockets';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navActive: true,
      theme: 'dark',
      force: true
    };

    this.changeNav = this.changeNav.bind(this);
  }

  changeNav = () => {
    this.setState({navActive: !this.state.navActive});
  }

  changeColor = (colorVal) => {
    this.setState({theme: colorVal});
  }

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Switch>
            <Route path='/home'>
              <Navbar {...this.state}/>
              <Container className={"content " + ((this.state.navActive) ? "inactive" : "active") + " " + this.state.theme}>
                <NavButton changeNav={this.changeNav} />
                <Home theme={this.state.theme}/>
              </Container>
              <ColorNav changeColor={this.changeColor} theme={this.state.theme} />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/'>
              <Redirect to='/home'></Redirect>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;