import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const LibrarianHomeComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        console.log(event);
        event.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            localStorage.setItem('token', response.data.token);

            if(response.data.role === "Librarian") {
                navigate('/librarianHome');
            } else if(response.data.role === "Bookworm"){
                navigate('/bookWormHome');
            }
            else{
                setError("Invalid user");
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    }
    
    const handleRegister = () => {
        navigate('/register');
    }

    const handleGuest = () => {
        navigate('/guestHome');
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleGuest}>Continue as a guest</button>
        </div>
    );
}

export default LibrarianHomeComponent;
