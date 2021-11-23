import { API_URL } from '../config'
import io from 'socket.io-client';

const socket = io.connect(API_URL, {reconnection: true} );

export default socket;