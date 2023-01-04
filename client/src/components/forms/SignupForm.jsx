import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSignup = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(signup({ email, username, password, confirmPassword }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.csrf_token) {
          alert('Something went wrong when submitting the form. Please try again.');
        }
        else {
          setErrors(err);
        }
      });
  };

  return (
    <form id="loginForm" className="form" onSubmit={handleSignup}>
      <header>
        <h2>Log In</h2>
      </header>
      <main>
        <div className="formField">
          <label htmlFor="username">Username</label>
          <div className="inputContainer">
            <input
              className="input"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <p>{errors.username}</p>
          </div>
        </div>
        <div className="formField">
          <label htmlFor="email">Email</label>
          <div className="inputContainer">
            <input
              className="input"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <p>{errors.email}</p>
          </div>
        </div>
        <div className="formField">
          <label htmlFor="password">Password</label>
          <div className="inputContainer">
            <input
              className="input"
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <p>{errors.password}</p>
          </div>
        </div>
        <div className="formField">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="inputContainer">
            <input
              className="input"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <p>{errors.confirm_password}</p>
          </div>
        </div>
      </main>
      <footer>
        <div className="buttons">
          <button className="btn" type="submit">Sign up</button>
        </div>
        <div className="text">
          <span>Already registered?</span>
          <Link to="/login">Log in here.</Link>
        </div>
      </footer>
    </form>
  );
};

export default SignupForm;
