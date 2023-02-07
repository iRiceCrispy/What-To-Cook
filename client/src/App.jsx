import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getIngredients } from './store/ingredients';
import { getRecipes } from './store/recipes';
import { getUserIngredients } from './store/userIngredients';
import { restoreSession, getSessionUser } from './store/session';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RecipeDetails from './components/ui/RecipeDetails';
import RecipeForm from './components/forms/RecipeForm';

const App = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getSessionUser);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(restoreSession());
      await dispatch(getIngredients());
      await dispatch(getRecipes());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser) dispatch(getUserIngredients(sessionUser.id));
  }, [dispatch, sessionUser]);

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
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/recipes/create"
          element={<RecipeForm />}
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetails />}
        />
        <Route
          path="/recipes/:id/edit"
          element={<RecipeForm edit />}
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
