import { API_URL } from '../config'


async function register(user) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    return await fetch(`${API_URL}/register`, options).then((response) => response.json()).then((data) => {
        if (data.username) {
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data
    });
}

async function login(user) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    return fetch(`${API_URL}/login`, options).then((response) => response.json()).then((data) => {
        if (data.username) {
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data
    });
}

async function getUsers() {
    let options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/users`, options).then((response) => response.json());
}

async function getProfile(username) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username})
    }
    return fetch(`${API_URL}/user`, options).then((response) => response.json());
}

async function getGame(id) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({game_id: id})
    }
    return fetch(`${API_URL}/game`, options).then((response) => response.json());
}

async function getRoom(id) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({room_id: id})
    }
    return fetch(`${API_URL}/room`, options).then((response) => response.json());
}

function logout() {
    localStorage.removeItem('user');
}

function getUser() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {username: ''};
}
 
export {
    register,
    login,
    logout,
    getUser,
    getUsers,
    getGame,
    getRoom,
    getProfile
}