import React from 'react';

import './Room.css';
import '../../global.css';

import history from '../../helpers/history';

import { create } from '../../helpers/other';
import { getRoom } from '../../helpers/service';
import { WEB_URL } from '../../config';
import { Link } from 'react-router-dom';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room_code: null,
            room: null,
            invalid_code: false,
            error: false,
            fetch: true
        }
    }

    join = async (e) => {
        e.preventDefault();
        getRoom(this.state.room_code).then((data) => {
            history.push('/h/g/' + data.room_id);
        }).catch((err) => {
            this.setState({
                invalid_code: true,
            });
            console.log(err)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
            <div className='create-box-outer'>
                <div className={this.props.theme + '2 create-box'}>
                    <h1>Join existing room</h1>
                    <form onSubmit={this.join}>
                        <div>Enter room code</div>
                        <input type='text' name='room_code' value={this.state.value} onChange={this.handleChange}></input>
                        {this.state.invalid_code &&
                            <div className='err'>
                                Invalid room code.
                            </div>
                        }
                        <button type='submit'>Join Your friend's room</button>
                    </form>
                </div>
                <div className={this.props.theme + '2 create-box'}>
                    <h1>Create new room</h1>
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
                                <div> {`${WEB_URL}/h/g/${this.state.room}`}</div>
                            </div>
                            <Link to={'/h/g/' + this.state.room}>
                                <button className=''>Join Your room</button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default Room;