import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const host = process.env.REACT_APP_HOST
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //API CALL
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();

        if (json.success) {
            // redirect user and save the auth token
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In Successfully", "success")
            navigate("/");
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Login</h2>
            <form action="" method='post' onSubmit={handleSubmit}>
                <div class="note-form">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} required />
                </div>
                <div class="note-form">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} required />
                </div>
                <button type="submit">Login</button>
            </form>

        </>
    )
}

export default Login