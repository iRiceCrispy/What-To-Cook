import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { recipesSelectors } from '../../../store/recipes';
import { getSessionUser } from '../../../store/session';
import Navigation from '../Navigation';

const RecipeDetails = () => {
  const { id } = useParams();
  const sessionUser = useSelector(getSessionUser);
  const recipe = useSelector(state => recipesSelectors.selectById(state, id));
  const isOwner = recipe.user.id === sessionUser?.id;

  return (
    <div id="recipeDetails">
      <Navigation />
      {recipe ? (
        <>
          <h2 className="name">{recipe.name}</h2>
          <p className="description">{recipe.description || 'No description.'}</p>
          {isOwner && <Link to="./edit" className="btn">Edit</Link>}
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
