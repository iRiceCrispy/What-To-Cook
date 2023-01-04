import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { restoreSession } from './store/session';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    dispatch(restoreSession())
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  return isLoaded && (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Splash />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
