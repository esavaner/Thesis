
import React from 'react';

import './Square.css';
import '../../../global.css';

class Square extends React.Component {

    update = (e) => {
        this.props.update(e);
    }

    render() {
        let col = this.props.num;
        let styles = {};
        if (this.props.picked === this.props.val) {
            col = "P";
            styles = {pointerEvents: 'none', position: 'absolute', left: 0, top: 0, zIndex:2, transform: `translate(${this.props.pX}px, ${this.props.pY}px)`};
        }
        return (
            <div className={'sq ' + this.props.theme + col} onMouseDown={this.props.pick}>
                <img src={this.props.piece} alt={this.props.val} style={styles}></img>
            </div>
        );
    }
}

export default Square;