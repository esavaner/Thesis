
import React from 'react';

import './Board.css';
import '../../../globalColors.css';
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
                let color = (i%2===0 && j%2===0) || (i%2!==0 && j%2!==0)? "4" : "5";
                row.push(<Square theme={this.props.theme} num={color} key={j} update={this.update} 
                    piece={figures[this.props.grid[i][j]]} val={letters[i] + (j+1)}/>);
            }
            board.push(
                <div key={i}>
                    {row}
                </div>
            );
        }
        return (
            <div>
                {board}
            </div>
        );
    }
}

export default Board;