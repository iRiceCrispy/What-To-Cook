import React from 'react';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '../../store/ingredients';
import { userIngredientsSelectors } from '../../store/userIngredients';
import Navigation from '../../components/ui/Navigation';

const Splash = () => {
  const ingredients = useSelector(ingredientsSelectors.selectAll);
  const userIngredients = useSelector(userIngredientsSelectors.selectAll);

  return (
    <div id="splash">
      <Navigation />
      <ul className="ingredients">
        <p>All Ingredients</p>
        {ingredients.map(ingredient => (
          <li className="ingredient" key={ingredient.id}>
            <span>{ingredient.name}</span>
            {' '}
            {ingredient.verified && <span>✔️</span>}
          </li>
        ))}
      </ul>
      <ul className="userIngredients">
        <p>All User Ingredients</p>
        {userIngredients.map(ingredient => (
          <li className="ingredient" key={ingredient.id}>
            <span>{ingredient.name}</span>
            {' '}
            {ingredient.verified && <span>✔️</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Splash;
