import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const activeStyle = ({ isActive }) => ({
  color: isActive ? 'var(--text-secondary)' : 'inherit',
  fontWeight: isActive ? 700 : 500,
  textDecoration: 'none',
  marginRight: 16
});

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  /** Simple layout with top navigation for pages. */
  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          minHeight: 'auto',
          padding: 24,
          position: 'relative',
          zIndex: 100, // ensure nav sits above floating controls
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            marginBottom: 16,
            position: 'relative',
            zIndex: 100,
          }}
        >
          <NavLink to="/login" style={activeStyle}>Login</NavLink>
          <NavLink to="/orders" style={activeStyle}>Orders</NavLink>
          <NavLink to="/returns" style={activeStyle}>Returns</NavLink>
          <NavLink to="/recommendations" style={activeStyle}>Recommendations</NavLink>
          <NavLink to="/logout" style={activeStyle}>Logout</NavLink>
        </nav>
      </header>
      <main style={{ padding: 24 }}>
        {children}
      </main>
    </div>
  );
}
