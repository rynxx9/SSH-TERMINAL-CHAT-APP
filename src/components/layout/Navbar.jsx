import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar glass">
            <div className="nav-content container">
                <div className="logo">
                    <span className="logo-icon">🐝</span>
                    <span className="logo-text">DevHive</span>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search DevHive..." />
                </div>
                <div className="nav-actions">
                    <button className="btn-icon">🔔</button>
                    <div className="user-profile">
                        <div className="avatar">R</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
