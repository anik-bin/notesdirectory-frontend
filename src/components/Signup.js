import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Signup = () => {
    // const host = process.env.REACT_APP_HOST
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API CALL
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            // redirect user and save the auth token
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            toast.success('You have successfully created your account');
        }
        else {
            toast.error("Invalid Details")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <>
           
            <h2>Signup</h2>
            <form action="" method='post' onSubmit={handleSubmit}>
                <div class="note-form">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" onChange={onChange} required />
                </div>
                <div class="note-form">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" onChange={onChange} required />
                </div>
                <div class="note-form">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={onChange} minLength={5} required />
                </div>
                <div class="note-form">
                    <label htmlFor="cpassword">Confirm Password: </label>
                    <input type="password" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit">Signup</button>
            </form>
        </>
    )
}

export default Signup