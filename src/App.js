import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import './global.css';

import history from './helpers/history';

import Navbar from './components/navbar/Navbar';

import Login from './components/login/Login';
import Home from './components/home/Home';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome,  faSignOutAlt, faSignInAlt, faUser, faMedal, faBars, faFlag, faGraduationCap, faCog, faSort, faCrown,
	faChess, faChessBoard, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessBishop, faChessRook
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHome, faSignInAlt, faSignOutAlt, faUser, faMedal, faBars, faFlag, faGraduationCap, faCog, faSort, faCrown,
	faChess, faChessBoard, faChessPawn, faChessKing, faChessKnight, faChessQueen, faChessBishop, faChessRook,
	faFacebook, faGithub, faYoutube, faTwitter
);

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
								<Navbar {...this.state} changeColor={this.changeColor}/>
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