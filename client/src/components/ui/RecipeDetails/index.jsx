import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { recipesSelectors, removeRecipe } from '../../../store/recipes';
import { getSessionUser } from '../../../store/session';
import { userIngredientsSelectors } from '../../../store/userIngredients';
import Navigation from '../Navigation';

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sessionUser = useSelector(getSessionUser);
  const userIngredients = useSelector(userIngredientsSelectors.selectAll);
  const recipe = useSelector(state => recipesSelectors.selectById(state, id));
  const isOwner = recipe.user.id === sessionUser?.id;

  const handleDelete = () => {
    dispatch(removeRecipe(id));
    navigate('/dashboard');
  };

  return (
    <div id="recipeDetails">
      <Navigation />
      {recipe ? (
        <>
          <h2 className="name">{recipe.name}</h2>
          <p className="description">{recipe.description || 'No description.'}</p>
          {isOwner && (
          <>
            <Link to="./edit" className="btn">Edit</Link>
            <button className="btn" type="button" onClick={handleDelete}>Delete</button>
          </>
          )}
          <div className="matchingIngredients">
            <span>
              You have
              {' '}
              {recipe.ingredients.filter(i => userIngredients.some(ui => ui.id === i.id)).length}
              /
              {recipe.ingredients.length}
              {' '}
              required ingredients.
            </span>
          </div>
          <ul className="ingredients">
            {recipe.ingredients.map(ingredient => (
              <li className="ingredient" key={ingredient.id}>
                {ingredient.name}
              </li>
            ))}
          </ul>
          <ul className="instructions">
            {recipe.instructions.map(instruction => (
              <li className="instruction" key={instruction.id}>
                <span className="order">
                  {instruction.order}
                  {' '}
                  .
                </span>
                <span className="body">{instruction.body}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No Recipe Found</p>
      )}
    </div>
  );
};

export default RecipeDetails;
