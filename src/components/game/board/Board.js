
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
            for(let j = 0; j < 8; j++) {
                let color = (i%2===0 && j%2===0) || (i%2!==0 && j%2!==0)? "L" : "D";
                board.push(<Square theme={this.props.theme} num={color} key={i.toString() + j} 
                    pick={this.props.pick} drop={this.props.drop} move={this.props.move} pX={this.props.pX} pY={this.props.pY}
                    piece={figures[this.props.grid[i][j]]} val={letters[j] + (8 - i)} picked={this.props.picked}/>);
            }
        }
        if (this.props.color === 'black') {
            board = board.reverse()
        }
        return (
            <div className='board' onMouseMove={this.props.move} onMouseUp={this.props.drop} onMouseDown={this.props.pick}>
                {board}
            </div>
        );
    }
}

export default Board;