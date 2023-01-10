import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { recipesSelectors } from '../../../store/recipes';
import Navigation from '../Navigation';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useSelector(state => recipesSelectors.selectById(state, id));

  return (
    <div id="recipeDetails">
      <Navigation />
      {recipe ? (
        <>
          <h2 className="name">{recipe.name}</h2>
          <p className="description">{recipe.description || 'No description.'}</p>
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
