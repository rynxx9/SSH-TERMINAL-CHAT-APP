import React from 'react';

const Sidebar = () => {
    const trending = [
        { tag: '#react_js', count: '1.2k' },
        { tag: '#morocco_tech', count: '850' },
        { tag: '#career_path', count: '620' },
        { tag: '#javascript', count: '2.1k' },
        { tag: '#ai_tools', count: '540' }
    ];

    return (
        <aside className="sidebar">
            <div className="card sidebar-card">
                <h3>Trending Topics</h3>
                <ul className="trending-list">
                    {trending.map((item, i) => (
                        <li key={i}>
                            {item.tag} <span>{item.count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="card sidebar-card">
                <h3>Community Rules</h3>
                <ul className="rules-list">
                    <li>1. Be respectful</li>
                    <li>2. No spam</li>
                    <li>3. Help others</li>
                </ul>
            </div>

            <div className="card sidebar-card secondary">
                <p>© 2026 DevHive for Moroccan Devs</p>
                <div className="footer-links">
                    <a href="#">About</a> • <a href="#">Terms</a> • <a href="#">Privacy</a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
