import React from 'react';

import './Room.css';
import '../../global.css';

import { create } from '../../helpers/other';
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
        create().then((data) => {
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
            <div className={this.props.theme + '2 wrap'}>
                <div className='head ct'>
                    Creating new room
                </div>
                <div className='mr'>
                    {!this.state.room && !this.state.error &&
                        <div className='row'>
                            <div className='loader'></div>
                            <div className='fetch'>
                                Fetching new room
                            </div>
                        </div>
                    }
                    {this.state.error &&
                        <div>
                            <div className='err'>
                                Error occured while creating new room.
                            </div>
                            <button className='' onClick={this.retry}>Retry</button>
                        </div>
                    }
                    {this.state.room &&
                        <div>
                            <div className='mr'>
                                <span>Share this code with your friend</span>
                            </div>
                            <div className={this.props.theme + '3 ct pd id'}>
                                {this.state.room}
                            </div>
                            <div className='mr'>
                                Or send this link
                            </div>
                            <div className={this.props.theme + '3 ct pd url'}>
                                <div> {`${API_URL}/h/g/${this.state.room}`}</div>
                            </div>
                            <div className='ct mr'>
                                <Link to={'/h/g/' + this.state.room}>
                                    <button className=''>Join room</button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Room;