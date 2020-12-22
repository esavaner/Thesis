import React from 'react';
import { Link, useParams } from 'react-router-dom';

import '../../global.css';
import './Game.css';
import Board from './board/Board';

import socket from '../../helpers/sockets';
import { getUser } from '../../helpers/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GameWithParams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [
                ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
            ],
            moves: [],
            picked: null,
            pX: 0,
            pY: 0,
            posX: 0,
            posY: 0,
            p1: null,
            p2: null,
            started: false,
            finished: false,
            color: null,
            turn: 'white',
            time1: 6000,
            time2: 6000,
            user: getUser(),
            playerW: 'Anonymous',
            playerB: 'Anonymous',
        }
        this.i = null;
    }

    pick = (e) => {
        let x = e.pageX;
        let y = e.pageY;
        let alt = e.target.alt;
        if (!this.state.picked) {
            this.setState({
                pX: 0,
                pY: 0,
                posX: x,
                posY: y,
                picked: alt
            })
        }
        e.stopPropagation()
        e.preventDefault()
    }

    drop = (e) => {
        if (this.state.started && this.state.turn === this.state.color && e.target && e.target.alt) {
            socket.emit('move', {room: this.props.room, from: this.state.picked, to: e.target.alt, promo: ''})
        }
        console.log(this.state.picked + ' ' + e.target.alt);
        this.setState({
            picked: null
        })
        e.stopPropagation()
        e.preventDefault()
    }

    move = (e) => {
        let x = e.pageX;
        let y = e.pageY;
        this.setState({
            pX: x - this.state.posX,
            pY: y - this.state.posY 
        })
        e.stopPropagation()
        e.preventDefault()
    }

    componentDidMount() {
        socket.open();
        socket.emit('join', {room: this.props.room, username: this.state.user.username});
        socket.on('rejoin', (resp) => {
            if (!this.state.color) {
                this.setState({color: resp.color})
            }
        });
        socket.on('left', (resp) => {
            console.log(resp, 'left');
        });
        socket.on('moved', (resp) => {
            console.log(resp, 'moved');
            let board = resp.board.split(/\n/g).map(r => r.split(/ /g));
            console.log(board)
            this.setState({ grid: board, turn: resp.turn, moves: resp.moves});
        });
        socket.on('message', (resp) => {
            console.log(resp, 'message');
        });
        socket.on('start', (resp) => {
            console.log('Started');
            this.setState({
                started: true,
                playerW: resp.playerW || 'Anonymous', 
                playerB: resp.playerB || 'Anonymous'
            });
            this.i = setInterval(() => {
                if (this.state.turn === this.state.color) {
                    if(this.state.time1 > 0)
                        this.setState({time1: this.state.time1 - 1});
                } else {
                    if(this.state.time2 > 0)
                        this.setState({time2: this.state.time2 - 1});
                }
            }, 100);
        });
        socket.on('finished', (resp) => {
            console.log(resp, 'finished');
        });
        socket.on('stalemate', (resp) => {
            console.log(resp, 'stalemate');
        });
        socket.on('insufficient', (resp) => {
            console.log(resp, 'insufficient');
        });
    }

    componentWillUnmount() {
        socket.emit('leave', {room: this.props.room, username: this.state.user.username});
        socket.close();
        clearInterval(this.i);
    }

    render() {
        let move_list = [];
        for (let i = 0; i < Math.ceil(this.state.moves.length/2); i++) {
            let row = [<div className='part' key={i + 'b'}>{i + 1}.</div>];
            row.push(<div className='part' key={i + 'n'}>{this.state.moves[2*i]}</div>);
            if (this.state.moves.length !== i*2+1)
                row.push(<div className='part' key={i + '2n'}>{this.state.moves[2*i + 1]}</div>);
            move_list.push(<div className='row' key={i + 'r'}>{row}</div>)
        }
        return (
            <div className='game'>
                <div className='main'>
                    <div className={'timer '  +  (this.state.color !== this.state.turn ? this.props.theme + '2 turn' : '')}>
                        <span>
                            {this.state.color === 'white' ? this.state.playerB : this.state.playerW}
                        </span>
                        <div className={this.props.theme + '3 bar'}>
                            <div className='bar-inner' style={{width: `${this.state.time2*100/6000}%`}}></div>
                        </div>
                        <span>
                            {Math.floor((this.state.time2%(10*60*60))/(10*60))}m {Math.floor((this.state.time2%(10*60))/(10))}s {Math.floor(this.state.time2%10)}
                        </span>
                    </div>
                    <Board pick={this.pick} drop={this.drop} move={this.move} pX={this.state.pX} pY={this.state.pY}
                        theme={this.props.theme} grid={this.state.grid} picked={this.state.picked} color={this.state.color}></Board>
                    <div className={'timer '  +  (this.state.color === this.state.turn ? this.props.theme + '2 turn' : '')}>
                        <span>
                            {this.state.user.username || 'Anonymous'}
                        </span>
                        <div className={this.props.theme + '3 bar'}>
                            <div className='bar-inner' style={{width: `${this.state.time1*100/6000}%`}}></div>
                        </div>
                        <span>
                            {Math.floor((this.state.time1%(10*60*60))/(10*60))}m {Math.floor((this.state.time1%(10*60))/(10))}s {Math.floor(this.state.time1%10)}
                        </span>
                    </div>
                </div>
                <div className='side'>
                    <div className={this.props.theme + '2 moves'}>
                        <div style={{textAlign: 'center', margin: '10px'}}>
                            <Link to='/h'><button><FontAwesomeIcon icon='flag'></FontAwesomeIcon></button></Link>
                            <button><FontAwesomeIcon icon='cog'></FontAwesomeIcon></button>
                            <h2>Moves</h2>
                        </div>
                        <div className='sep'/>
                        {this.state.started &&
                            <div className='move-list'>{move_list}</div>
                        }
                        {!this.state.started &&
                            <div style={{flexGrow: 1}}>Waiting for other player</div>
                        }
                </div>
                </div>
            </div>
        );
    }
}

function withUseParams(Component) {
    return function({theme}) {
        const { room } = useParams();
        return <Component {...{theme, room}}/>
    }
}

const Game = withUseParams(GameWithParams);

export default Game;