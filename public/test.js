import { useState } from 'react';

// creates users comonents
const User = () => {
    const [users, setUsers] = useState();

    return (
        <article>
            <h2>Users List</h2>
            {users?.length 
            // if true
            ? (
                <ul>
                    // users and index of arrray
                    {users.map(user, i => (
                        <li key={user.id}>{user.username} - {user.email}</li>
                    ))}
                </ul>
            )
        } 
        </article>
    );
}
export default User;