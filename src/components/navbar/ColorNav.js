import React from 'react';
import './ColorNav.css';

class ColorNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorActive: false
        }
    }

    changeColorNav = () => {
        this.setState({colorActive: !this.state.colorActive})
    }

    changeCol = (colorButton) => {
        this.props.changeColor(colorButton.target.value)
    }

    render() {
        return (
            <div className={"clr " + ((this.state.colorActive) ? "activeColor" : "inactiveColor") + " " + this.props.theme + "2"}>
                <button className="clrButton" onClick={this.changeCol} value="dark">Dark</button>
                <button className="clrButton" onClick={this.changeCol} value="light">Light</button>
                <button className="expandButton" onClick={this.changeColorNav}>Color</button>
            </div>
        );
    }
}

export default ColorNav;