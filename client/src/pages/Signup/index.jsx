import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/forms/SignupForm';
import './index.scss';

const Signup = () => (
  <div id="signup">
    <div className="logo">
      <Link to="/">
        What To Cook
      </Link>
    </div>
    <div className="formContainer">
      <SignupForm />
    </div>
  </div>

);

export default Signup;
