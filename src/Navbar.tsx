import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">Ballroom Bookkeeper</Link>
            
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasic" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">Home</Link>
                    <Link to="/about" className="navbar-item">About</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;