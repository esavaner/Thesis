import React from 'react';
import './NavButton.css';


class NavButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.changeNav}>Menu</button>
        )
    }
}

export default NavButton