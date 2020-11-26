import API_URL from '../../config';
import header from './check';

function getUsers() {
    const options = {
        method: 'GET',
        headers: header()
    }
    return fetch(`${API_URL}/users`, options);
}

export {
    getUsers
}