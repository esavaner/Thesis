import API_URL from '../config'


async function create() {
    let user = localStorage.getItem('user') ? localStorage.getItem('user') : {username: ''}
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: user
    }
    return await fetch(`${API_URL}/create`, options).then((resp) => resp.json());
}

 
export { create };