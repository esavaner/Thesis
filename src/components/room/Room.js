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
            error: false,
            fetch: true
        }
    }

    retry = async () => {
        this.setState({
            error: false,
            fetch: true
        });
        create().then((data) => {
            this.setState({
                room: data.room,
                error: false,
                fetch: false
            });
        }).catch((err) => {
            this.setState({
                error: true, 
                fetch: false
            });
            console.log(err)
        })
    }
    componentDidMount() {
        this.retry();
    }

    render() {
        return (
            <div className={this.props.theme + '2 wrap'}>
            <h1>Creating new room</h1>
                {this.state.fetch &&
                    <div className='fetch'>
                        <div className='loader'></div>
                        <span>Fetching new room</span>
                    </div>
                }
                {this.state.error &&
                    <>
                        <div className='err'>
                            Error occured while creating new room.
                        </div>
                        <button className='' onClick={this.retry}>Retry</button>
                    </>
                }
                {this.state.room &&
                    <>
                        <span>Share this code with your friend</span>
                        <div className={this.props.theme + '3 rd id'}>
                            {this.state.room}
                        </div>
                        <span>Or send this link</span>
                        <div className={this.props.theme + '3 rd'}>
                            <div> {`${API_URL}/h/g/${this.state.room}`}</div>
                        </div>
                        <Link to={'/h/g/' + this.state.room}>
                            <button className=''>Join room</button>
                        </Link>
                    </>
                }
            </div>
        );
    }
}

export default Room;