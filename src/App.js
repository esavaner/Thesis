import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import './global.css';

import history from './helpers/history';

import Navbar from './components/navbar/Navbar';

import Login from './components/login/Login';
import Home from './components/home/Home';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChessKing, faSignOutAlt, faSignInAlt, faCog, faMedal, faChessKnight, faChess, faChessBoard, faBars, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHome, faChessKing, faSignOutAlt, faSignInAlt, faCog, faMedal, faChessKnight, faChess, faChessBoard, faBars, faFlag);

class App extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
     		nav: true,
			theme: 'dark',
			force: true
    	};
    	this.changeNav = this.changeNav.bind(this);
  	}
	changeNav = () => {
		this.setState({  nav: !this.state.nav});
	}

	changeColor = (colorVal) => {
		this.setState({theme: colorVal});
	}

	render() {
		return (
			<div className='app'>
				<Router history={history}>
					<Switch>
						<Route path='/h'>
							<div className={this.state.theme + ' home'}>
								<Navbar {...this.state}/>
								<div className='toggle'>
									<button onClick={this.changeNav}><FontAwesomeIcon icon='bars'></FontAwesomeIcon></button>
								</div>
								<div className={'content ' + ((this.state.nav) ? 'inactive' : 'active') + ' ' + this.state.theme}>
									<Home theme={this.state.theme}/>
								</div>
							</div>
						</Route>
						<Route path='/register'>
							<Login />
						</Route>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/'>
							<Redirect to='/h'></Redirect>
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;