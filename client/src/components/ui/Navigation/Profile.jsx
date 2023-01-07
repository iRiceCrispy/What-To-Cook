import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import './Profile.scss';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate('/');
      });
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="profileContainer" ref={ref}>
      <button
        className="btn transparent profileButton"
        type="button"
        onClick={() => setShowMenu(prev => !prev)}
      >
        Welcome
        {' '}
        {user.username}
      </button>
      {showMenu && (
        <div className="profileMenu">
          <p className="menuItem">
            Username:
            {' '}
            {user.username}
          </p>
          <p className="menuItem">
            Email:
            {' '}
            {user.email}
          </p>
          <button
            className="btn transparent menuItem"
            type="button"
            onClick={handleLogout}
          >
            <span className="text">Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
