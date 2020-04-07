import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="navbar-list-item"><Link to="/">Home</Link></li>
        <li className="navbar-list-item"><Link to="/about">About</Link></li>
        <li className="navbar-list-item"><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;