import React from 'react';
import { useParams  } from 'react-router-dom';
import * as jsChessEngine from "js-chess-engine";

import '../../global.css';
import './Game.css';
import Board from './board/Board';

import { getUser, getGame } from '../../helpers/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let game = null;

class ReplayWithParams extends React.Component {

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
            current: null,
            curr_i: 0,
            time: 100,
            playing: false,
            started: false,
            finished: false,
            playerW: 'Anonymous',
            playerB: 'Anonymous',
            color: 'white',
            user: getUser() || 'Anonymous'
        };
        this.i = null;
        this.t = null;
    }

    checkFinished = (game) => {
        if (game.exportJson().isFinished || this.state.curr_i === this.state.moves.length - 1) {
            this.setState({
                finished: true,
                playing: false,
                time: 100
            });
            clearInterval(this.i)
            clearInterval(this.t)
        }
    }

    drop = (e) => {}

    move = (e) => {}

    pick = (e) => {}

    updateBoard = (board) => {
        let grid = []
        let arr = board.toString().split(' ')[0].split('/');
        for(let row of arr) {
            let r = []
            for (let piece of row) {
                if (!isNaN(parseFloat(piece)) && isFinite(piece)) {
                    for(let i = 0; i < parseInt(piece); i++)
                        r.push('.');
                } else
                    r.push(piece);
            }
            grid.push(r);
        }
        return grid;
    }

    forward = () => {
        try {  
            if(this.state.curr_i + 1 === this.state.moves.length) return
            let m = this.state.moves[this.state.curr_i]
            game.move(m.substring(0,2), m.substring(2,5));
            this.setState({
                grid: this.updateBoard(game.exportFEN()),
                current: this.state.moves[this.state.curr_i + 1],
                curr_i: this.state.curr_i + 1,
                time: 100
            });
            this.checkFinished(game);
        } catch (e) { console.log(e) }
    }

    backward = () => {
        try {
            if (this.state.curr_i === 0) return
            game = new jsChessEngine.Game();
            for(let i = 0; i < this.state.curr_i - 1; i++) {
                game.move(this.state.moves[i].substring(0,2), this.state.moves[i].substring(2,5));
            }
            this.setState({
                grid: this.updateBoard(game.exportFEN()),
                current: this.state.moves[this.state.curr_i - 1],
                curr_i: this.state.curr_i - 1
            })
        } catch (e) { console.log(e) }
    }

    play = () => {
        if(this.state.curr_i + 1 === this.state.moves.length) return
        if (!this.state.playing) {
            this.setState({
                playing: true
            });
            this.i = setInterval(this.forward, 1000);
            this.t = setInterval(() => {
                if (this.state.time > 0)
                    this.setState({time: this.state.time - 1})
            }, 10);
        } else {
            this.setState({
                playing: false,
                time: 100
            });
            clearInterval(this.i)
            clearInterval(this.t)
        }
    }

    componentDidMount() {
        game = new jsChessEngine.Game();
        getGame(this.props.game_id).then(
            (g) => {
                let col = this.state.user.username === g.player1 ? 'white' : 'black';
                let m = JSON.parse('{"moves":' + g.moves.replaceAll('\'', '"') + '}').moves;
                this.setState({
                    playerW: g.player1,
                    playerB: g.player2,
                    color: col,
                    moves: m,
                    current: m.length > 0 ? m[0] : null,
                    curr_i: 0
                });
            },
            (err) => console.log(err)
        )
    }

    render() {
        let move_list = [];
        for (let i = 0; i < Math.ceil(this.state.moves.length/2); i++) {
            let row = [<div className='part' key={i + 'b'}>{i + 1}.</div>];
            row.push(<div className={'part ' + (this.state.moves[2*i] === this.state.current ? 'current' : '')} key={i + 'n'}>{this.state.moves[2*i]}</div>);
            if (this.state.moves.length !== i*2+1)
                row.push(<div className={'part ' + (this.state.moves[2*i+1] === this.state.current ? 'current' : '')} key={i + '2n'}>{this.state.moves[2*i + 1]}</div>);
            move_list.push(<div className='row' key={i + 'r'}>{row}</div>)
        }
        return (
            <div className='game'>
                <div className='main'>
                    <div className='player'> 
                        {this.state.color === 'white' ? this.state.playerB : this.state.playerW}
                    </div>
                    <Board pick={this.pick} drop={this.drop} move={this.move} pX={0} pY={0} checkers={[]}
                        theme={this.props.theme} grid={this.state.grid} picked={null} color={this.state.color}></Board>
                    <div className='player'>
                        {this.state.user.username || 'Anonymous'}
                    </div>
                </div>
                <div className='side'>
                    <div className={this.props.theme + '2 moves'}>
                        <div style={{textAlign: 'center', margin: '10px'}}>
                            <h2>Moves</h2>
                        </div>
                        <div className='sep'/>
                        <div className='move-list'>{move_list}</div>
                        <div className='sep'/>
                        <div className='direct'>
                            <button onClick={this.backward}><FontAwesomeIcon icon='step-backward'/></button>
                            <button onClick={this.play}>
                                {!this.state.playing && <FontAwesomeIcon icon='play'/>}
                                {this.state.playing && <FontAwesomeIcon icon='pause'/>}
                            </button>
                            <button onClick={this.forward}><FontAwesomeIcon icon='step-forward'/></button>
                            <div className='mini-timer' style={{width: `${this.state.time}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function withUseParams(Component) {
    return function({theme}) {
        const { game_id } = useParams();
        return <Component {...{theme, game_id}}/>
    }
}

const Replay = withUseParams(ReplayWithParams);

export default Replay;