import React from 'react';
import './UserField.css';


class UserField extends React.Component {
    render() {
        return (
            <div>
                <span>Photo</span>
                <span>Username</span>
                <button>Profile</button>
            </div>
        )
    }
}

export default UserField