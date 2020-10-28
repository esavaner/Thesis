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

import { Container, Row, Col } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navActive: true,
      colorValue: 'dark',
      force: true
    };

    this.changeNav = this.changeNav.bind(this);
  }

  changeNav = () => {
    this.setState({navActive: !this.state.navActive});
  }

  changeColor = (colorVal) => {
    this.setState({colorValue: colorVal});
  }

  forceUpdate = () => {
    this.setState({force: !this.state.force});
  }

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Switch>
            <Route path='/home'>
              <Navbar {...this.state}/>
              <Container className={"content " + ((this.state.navActive) ? "inactive" : "active") + " " + this.state.colorValue}>
                <NavButton changeNav={this.changeNav} />
                <Home />
              </Container>
              <ColorNav changeColor={this.changeColor} colorValue={this.state.colorValue} />
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

function Home() {
  return <h1>Home</h1>
}

export default App;