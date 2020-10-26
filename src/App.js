import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './globalColors.css';

import Navbar from './components/navbar/Navbar';
import NavButton from './components/navbar/NavButton';
import ColorNav from './components/navbar/ColorNav';

import Repos from './components/repos/Repos';

import { Container, Row, Col } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navActive: true,
      colorValue: 'dark'
    };

    this.changeNav = this.changeNav.bind(this);
  }

  changeNav = () => {
    this.setState({navActive: !this.state.navActive})
  }

  changeColor = (colorVal) => {
    this.setState({colorValue: colorVal})
  }

  render() {
    return (
      <div className="app">
        <Router>
        <Navbar navState={this.state}/>
          <Container className={"content " + ((this.state.navActive) ? "inactive" : "active") + " " + this.state.colorValue}>
            <NavButton changeNav={this.changeNav}/>
              <Switch>
                <Route path='/home'>
                  <Home/>
                </Route>
                <Route path='/repos'>
                  <Repos/>
                </Route>
                <Route path='/'>
                  <Home/>
                </Route>
              </Switch>
          </Container>
        </Router>
        <ColorNav changeColor={this.changeColor} colorValue={this.state.colorValue}/>
      </div>
    );
  }
}

function Home() {
  return <h1>Home</h1>
}

export default App;