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
  const logAndPass = (label) => () => {
    // eslint-disable-next-line no-console
    console.debug(`[NAV] ${label} clicked`);
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          minHeight: 'auto',
          padding: 24,
          position: 'relative',
          zIndex: 1001, // ensure nav sits above floating controls
          pointerEvents: 'auto',
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            marginBottom: 16,
            position: 'relative',
            zIndex: 1001, // higher than any floating widgets
            pointerEvents: 'auto',
          }}
        >
          <NavLink to="/login" style={activeStyle} onClick={logAndPass('Login')}>Login</NavLink>
          <NavLink to="/orders" style={activeStyle} onClick={logAndPass('Orders')}>Orders</NavLink>
          <NavLink to="/returns" style={activeStyle} onClick={logAndPass('Returns')}>Returns</NavLink>
          <NavLink to="/recommendations" style={activeStyle} onClick={logAndPass('Recommendations')}>Recommendations</NavLink>
          <NavLink to="/logout" style={activeStyle} onClick={logAndPass('Logout')}>Logout</NavLink>
        </nav>
      </header>
      <main style={{ padding: 24 }}>
        {children}
      </main>
    </div>
  );
}
