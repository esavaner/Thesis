import React from 'react';
import { useParams } from 'react-router-dom';

import '../../global.css';
import Board from './board/Board';

import socket from '../../helpers/sockets';
import { getUser } from '../../helpers/auth/service';

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
            picked: null,
            p1: null,
            p2: null,
            started: false,
            finished: false,
            color: null,
            turn: 'white',
            user: getUser()
        }
        this.update = this.update.bind(this);
    }

    update = (e) => {
        if (e?.target) {
            if (!this.state.picked) {
                this.setState({
                    picked: e.target.alt
                })
            } else {
                if (this.state.turn === this.state.color)
                    socket.emit('move', {room: this.props.room, from: this.state.picked, to: e.target.alt, promo: ''})
                console.log(e.target.alt + ' ' + this.state.picked);
                this.setState({
                    picked: null
                })
            }
        }
    }

    componentDidMount() {
        console.log(this.props)
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
            this.setState({ grid: board, turn: resp.turn});
        });
        socket.on('message', (resp) => {
            console.log(resp, 'message');
        });
        socket.on('start', (resp) => {
            console.log('Started');
            this.setState({started: true})
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

    render() {
        return (
            <div>
                {this.state.started &&
                    <Board update={this.update} theme={this.props.theme} grid={this.state.grid} picked={this.state.picked} color={this.state.color}></Board>
                }
                {!this.state.started &&
                    <div>
                        Waiting for other player
                    </div>
                }
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