import React from 'react';
import { Link } from 'react-router-dom';

import './Main.css';
import '../../global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Main extends React.Component {

    render() {
        return (
            <div className='main'>
                <div className='falling'>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-rook'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-knight'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-bishop'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-queen'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-king'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-bishop'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-knight'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-rook'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                    <i><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></i>
                </div>
                <div className={this.props.theme + '2 front'}>
                    <h1>Join the chess community</h1>
                    <div>Play for free now.</div>
                    <Link to='/h/c'><button><FontAwesomeIcon icon='chess-pawn'></FontAwesomeIcon></button></Link>
                </div>
                <span>Find me on</span>
                <div className='socials'>
                    <a className='tw' href='https://twitter.com/EschDoii'>
                        <FontAwesomeIcon icon={['fab', 'twitter']}></FontAwesomeIcon>
                    </a>
                    <a className='fb' href='https://www.facebook.com/filip.rurak.77/'>
                        <FontAwesomeIcon icon={['fab', 'facebook']}></FontAwesomeIcon>
                    </a>
                    <a className='yt' href='https://www.youtube.com/channel/UCBEJovKE3GCRouViiCnqkjw'>
                        <FontAwesomeIcon icon={['fab', 'youtube']}></FontAwesomeIcon>
                    </a>
                    <a className='gh' href='https://github.com/esavaner'>
                        <FontAwesomeIcon icon={['fab', 'github']}></FontAwesomeIcon>
                    </a>
                </div>
            </div>
        );
    }
}

export default Main;