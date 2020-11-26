import React from 'react';

import './Room.css';
import '../../globalColors.css';

import { create } from '../../helpers/other';
import API_URL from '../../config';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
            <Container>
                <Row className={this.props.theme + '2'}>
                    <Col className="my-auto mx-auto">
                        <Row>
                            <h2>Create new room</h2>
                        </Row>
                        <Row>
                            <span>Share this code with your friend</span>
                        </Row>
                        <Row className="main_id">
                            {this.state.room}
                        </Row>
                        <Row>
                            Or send this link
                        </Row>
                        <Row className="main_url">
                            {this.state.room &&
                                <div> {`${API_URL}/home/game/${this.state.room}`}</div>
                            }
                        </Row>
                        <Row>
                            {this.state.error &&
                                <Button variant="warning" className="btn-warning" onClick={this.retry}>Retry</Button>
                            }
                            {this.state.room &&
                                <div>
                                    <Link to={'/home/game/' + this.state.room}>
                                        <Button variant="success" className="btn-success">Join room</Button>
                                    </Link>
                                </div>
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Room;