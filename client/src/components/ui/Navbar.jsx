import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {user ? `Hello, ${user.username}` : 'Guest'}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/"
              >
                Main
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/chat">
                Chat
              </a>
            </li>
            {user ? (
              <li className="nav-item">
                <a className="nav-link" href="/api/auth/logout">
                  Logout
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Sign up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
