import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getIngredients } from './store/ingredients';
import { getRecipes } from './store/recipes';
import { getPantry } from './store/pantry';
import { restoreSession, getSessionUser, fetchLikedRecipes } from './store/session';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RecipeDetails from './pages/RecipeDetails';
import RecipeForm from './pages/RecipeForm';

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
    dispatch(getPantry());
    dispatch(fetchLikedRecipes());
  }, [dispatch, sessionUser]);

  return isLoaded && (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home />}
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
          element={<RecipeForm key="create" />}
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetails />}
        />
        <Route
          path="/recipes/:id/edit"
          element={<RecipeForm key="edit" edit />}
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
