import API_URL from '../../config'


async function register(user) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    return await fetch(`${API_URL}/register`, options);
}

async function login(user) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    return fetch(`${API_URL}/login`, options).then((response) => response.json()).then((data) => {
        if (data.accessToken) {
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data
    });
}

function logout() {
    localStorage.removeItem('user');
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}
 
export default {
    register,
    login,
    logout,
    getUser
}