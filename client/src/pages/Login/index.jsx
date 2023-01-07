import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import './index.scss';

const Login = () => (
  <div id="login">
    <div className="logo">
      <Link to="/">
        What To Cook
      </Link>
    </div>
    <div className="formContainer">
      <LoginForm />
    </div>
  </div>
);

export default Login;
