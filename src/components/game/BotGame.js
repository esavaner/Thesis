import React from 'react';
import { Link  } from 'react-router-dom';
import * as jsChessEngine from "js-chess-engine";

import '../../global.css';
import './Game.css';
import Board from './board/Board';
import letters from './figures/letters';

import { getUser } from '../../helpers/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let diff = ['Beginner', 'Advanced', 'Expert'];
let game = null;

class BotGame extends React.Component {

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
            started: false,
            finished: false,
            difficulty: null,
            thinking: false,
            user: getUser() || 'Anonymous',
            turn: null,
        }
    }

    start = (e) => {
        console.log('Started');
        game = new jsChessEngine.Game();
        this.setState({
            started: true,
            turn: 'white',
            difficulty: e?.target?.value || 1
        });
        console.log(game);
        console.log(game.exportFEN())
    }

    pick = (e) => {
        let x = e.pageX;
        let y = e.pageY;
        let alt = e.target.alt;
        if (!this.state.picked) {
            this.setState({pX: 0, pY: 0, posX: x, posY: y, picked: alt});
        }
        e.stopPropagation()
        e.preventDefault()
    }

    checkFinished = (game) => {
        console.log(game.exportJson());
        if (game.exportJson().isFinished) {
            this.setState({
                finished: true,
                thinking: false,
                turn: game.exportJson().turn
            });
            console.log('finished');
            console.log(this.state);
        }
    }

    drop = (e) => {
        this.setState({
            picked: null
        })
        if (this.state.started && e.target && e.target.alt) {
            try {
                if (!this.state.finished) {
                    game.move(this.state.picked, e.target.alt);
                    this.setState({
                        grid: this.updateBoard(game.exportFEN()),
                        thinking: true
                    });
                    this.state.moves.push(this.state.picked + e.target.alt);
                    this.checkFinished(game);
                }
                setTimeout(() => {
                    if (!this.state.finished) {
                        let prev = this.updateBoard(game.exportFEN());
                        game.aiMove(this.state.difficulty);
                        let next = this.updateBoard(game.exportFEN());
                        this.setState({
                            grid: next,
                            thinking: false
                        });
                        this.state.moves.push(this.getMove(prev, next))
                        this.checkFinished(game);
                    }
                }, Math.floor(500/(this.state.difficulty+1)));
            } catch (e) {}
        }
        console.log(this.state.picked + ' ' + e.target.alt);
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

    getMove = (prev, next) => {
        let from, to;
        for (let i = 0; i < 8; i ++) {
            for (let j = 0; j < 8; j++) {
                if (prev[i][j] !== next[i][j]) {
                    if (next[i][j] === '.')
                        from = letters[j] + (8 - i);
                    else
                        to = letters[j] + (8 - i);
                }
            }
        }
        return from + to;
    }

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
                    {this.state.finished &&
                        <div className={this.props.theme + '2 end'}>
                            <h1>{this.state.turn === 'white' ? 'Defeat!' : 'Victory!'}</h1>
                            <Link to='/h'><button>Exit</button></Link>
                        </div>
                    }
                    <div className='player'> 
                        {this.state.thinking &&
                            <span className='loader'></span>
                        }
                        {this.state.difficulty ? diff[this.state.difficulty] + ' Bot' : 'Bot'}
                    </div>
                    <Board pick={this.pick} drop={this.drop} move={this.move} pX={this.state.pX} pY={this.state.pY} checkers={[]}
                        theme={this.props.theme} grid={this.state.grid} picked={this.state.picked} color={this.state.color}></Board>
                    <div className='player'>
                        {this.state.user.username || 'Anonymous'}
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
                            <div className='pick'>
                                Bot difficulty
                                <button onClick={this.start} value="0">Beginner</button>
                                <button onClick={this.start} value="1">Advanced</button>
                                <button onClick={this.start} value="2">Expert</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BotGame;