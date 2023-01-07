import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { demo, login } from '../../store/session';
import './index.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({});

    dispatch(login({ credential, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.csrfToken) {
          alert('Something went wrong when submitting the form. Please try again.');
        }
        else {
          setErrors(err);
        }
      });
  };

  const handleDemo = () => {
    setErrors({});

    dispatch(demo())
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.csrfToken) {
          alert('Something went wrong when submitting the form. Please try again.');
        }
        else {
          setErrors(err);
        }
      });
  };

  return (
    <form id="loginForm" className="form" onSubmit={handleLogin}>
      <header>
        <h2>Welcome Back</h2>
        <div className="loginError" />
      </header>
      <main>
        <p className="error">{errors.login}</p>
        <div className="formField">
          <label htmlFor="credential">Username / Email</label>
          <div className="inputContainer">
            <input
              className="input"
              id="credential"
              value={credential}
              onChange={e => setCredential(e.target.value)}
            />
            <p className="error">{errors.credential}</p>
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
            <p className="error">{errors.password}</p>
          </div>
        </div>
      </main>
      <footer>
        <div className="buttons">
          <button className="btn" type="submit">Log In</button>
          <button className="btn" type="button" onClick={handleDemo}>Log In as Demo</button>
        </div>
        <div className="text">
          <span>Not registered? </span>
          <Link className="underline" to="/signup">Ceate an account.</Link>
        </div>
      </footer>
    </form>
  );
};

export default LoginForm;
