
import React from 'react';

import './Board.css';
import '../../../global.css';
import Square from '../square/Square';

import figures from '../figures/figures';
import letters from '../figures/letters';

class Board extends React.Component {

    update = (e) => {
        this.props.update(e);
    }

    render() {
        let board = [];
        for(let i = 0; i < 8; i++) {
            let row = [];
            for(let j = 0; j < 8; j++) {
                let color = (i%2===0 && j%2===0) || (i%2!==0 && j%2!==0)? "L" : "D";
                row.push(<Square theme={this.props.theme} num={color} key={j} update={this.update} 
                    piece={figures[this.props.grid[i][j]]} val={letters[j] + (8 - i)} picked={this.props.picked}/>);
            }
            if (this.props.color === 'white')
                board.push(<div className='row' key={i}>{row}</div>);
            else if (this.props.color === 'black')
                board.push(<div className='row' key={i}>{row.reverse()}</div>);
        }
        if (this.props.color === 'black') {
            board = board.reverse()
        }
        return (
            <div className='board'>
                {board}
            </div>
        );
    }
}

export default Board;