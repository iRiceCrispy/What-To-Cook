import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSessionUser } from '../../../store/session';
import Profile from './Profile';
import './index.scss';

const Navigation = () => {
  const sessionUser = useSelector(getSessionUser);

  return (
    <nav id="mainNav">
      <div className="navbar">
        <div className="start">
          <div className="logo">
            <Link to="/">
              What To Cook
            </Link>
          </div>
        </div>
        <div className="end">
          {sessionUser
            ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Profile user={sessionUser} />
              </>
            )
            : (
              <>
                <Link className="btn transparent" to="/login">Log In</Link>
                <Link className="btn transparent" to="/signup">Sign Up</Link>
              </>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
