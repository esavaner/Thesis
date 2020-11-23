
import React from 'react';

import './Square.css';
import '../../../globalColors.css';

class Square extends React.Component {

    update = (e) => {
        this.props.update(e);
    }

    render() {
        let col = this.props.picked === this.props.val ? "P" : this.props.num;
        return (
            <div className={'sq ' + this.props.theme + col} onClick={this.update}>
                <img src={this.props.piece} alt={this.props.val}></img>
            </div>
        );
    }
}

export default Square;