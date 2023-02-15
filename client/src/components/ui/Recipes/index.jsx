import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { recipesSelectors } from '../../../store/recipes';
import { pantrySelectors } from '../../../store/pantry';
import './index.scss';

const Recipes = () => {
  const pantry = useSelector(pantrySelectors.selectAll);
  const recipes = useSelector(recipesSelectors.selectAll);

  return (
    <div className="recipes">
      <h1>Recipes:</h1>
      <ul className="recipeList">
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link className="recipe" to={`/recipes/${recipe.id}`}>
              <p className="name">{recipe.name}</p>
              <p className="description">{recipe.description}</p>
              <p>
                By:
                {' '}
                {recipe.user.username}
              </p>
              <div className="matchingIngredients">
                <span>
                  You have
                  {' '}
                  {recipe.ingredients.filter(i => pantry.some(pi => pi.id === i.id)).length}
                  /
                  {recipe.ingredients.length}
                  {' '}
                  required ingredients.
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
