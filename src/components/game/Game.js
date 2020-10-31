import React from 'react';

import '../../globalColors.css';
import Board from './board/Board';

class Game extends React.Component {

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
            picked: null
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
                        ['.', '.', '.', '.', '.', '.', '.', '.'],
                        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
                    ]
                })
            }
        }
    }

    render() {
        return (
            <Board update={this.update} theme={this.props.theme} grid={this.state.grid}></Board>
        );
    }
}

export default Game;