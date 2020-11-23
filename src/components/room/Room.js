import React from 'react';

import './Room.css';
import '../../globalColors.css';

import service from '../../helpers/other';
import API_URL from '../../config';
import { Link } from 'react-router-dom';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            error: false
        }
    }

    retry = async () => {
        service.create().then((data) => {
            this.setState({
                room: data.room,
                error: false
            });
        }).catch((err) => {
            this.setState({error: true});
            console.log(err)
        })
    }
    componentDidMount() {
        this.retry();
    }

    render() {
        return (
            <div>
                <h2>Create new room</h2>
                <span>Copy this poop with ur friend</span>
                <input type="url"></input>
                {this.state.room &&
                    <div> {`${API_URL}/home/game/${this.state.room}`}</div>
                }
                {this.state.error &&
                    <button onClick={this.retry}>Retry</button>
                }
                {this.state.room &&
                    <div>
                        <Link to={'/home/game/' + this.state.room}>
                            <button>Join room</button>
                        </Link>
                    </div>
                }
            </div>
        );
    }
}

export default Room;