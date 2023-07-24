import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <>
            <nav className="nav-header">
                <Link className="nav-header-heading" to="/">Aniket Bindhani</Link>
                <div className="nav-header-links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            <div>

                {/* This is a conditional statement that checks if the token does not match then it shows login and signup button which means the user has not signed up or logged in yet and if the token matches then it shows the logout button */}
                
                {!localStorage.getItem('token') ? <form> 
                    <button type="button" className='btn-1'><Link to="/login">Login</Link></button>
                    <button type="button" className='btn-2'><Link to="/signup">Signup</Link></button>
                </form> : <button type="button" className='btn-2' onClick={handleLogout}>Logout</button>}

                
            </div>
            </nav>
        </>

    )
}

export default Navbar