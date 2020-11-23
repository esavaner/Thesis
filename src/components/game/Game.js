import React from 'react';
import { useParams } from 'react-router-dom';

import '../../globalColors.css';
import Board from './board/Board';

import socket from '../../helpers/sockets';
import service from '../../helpers/auth/service';

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
            user: service.getUser()
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
                socket.emit('move', {from: e.target.alt, to:this.state.picked})
                console.log(e.target.alt + ' ' + this.state.picked);
                this.setState({
                    picked: null,
                    grid: [
                        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                        ['.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', 'R'],
                        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
                    ]
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
        socket.on('message', (data) => {
            console.log(data);
        });
        socket.on('start', () => {
            console.log('Started');
            this.setState({started: true})
        })
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