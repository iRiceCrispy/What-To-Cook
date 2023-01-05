import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getIngredients } from './store/ingredients';
import { restoreSession } from './store/session';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(restoreSession());
      await dispatch(getIngredients());
      setIsLoaded(true);
    })();
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
