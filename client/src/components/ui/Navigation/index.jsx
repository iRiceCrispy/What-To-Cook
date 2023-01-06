import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSessionUser } from '../../../store/session';
import Profile from './Profile';

const Navigation = () => {
  const sessionUser = useSelector(getSessionUser);

  return (
    <nav>
      <div className="navContainer">
        <div className="home">
          <Link to="/">
            What To Cook
          </Link>
        </div>
        <div>
          {sessionUser
            ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Profile user={sessionUser} />
              </>
            )
            : (
              <>
                <Link className="btn" to="/login">Log In</Link>
                <Link className="btn" to="/signup">Sign Up</Link>
              </>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
