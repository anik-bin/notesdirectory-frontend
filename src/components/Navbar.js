import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    let location = useLocation();
    return (
        <>
            <nav className="nav-header">
                <Link className="nav-header-heading" to="/">Aniket Bindhani</Link>
                <div className="nav-header-links">
                    <ul>
                        <li><Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link></li>
                        <li><Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link></li>
                        <li><Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact</Link></li>
                    </ul>
                </div>
            <div>
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