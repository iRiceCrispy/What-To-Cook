import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { recipesSelectors, addRecipe, updateRecipe } from '../../store/recipes';
import { ingredientsSelectors } from '../../store/ingredients';
import './index.scss';

const RecipeForm = ({ edit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredientList = useSelector(ingredientsSelectors.selectAll);
  const recipe = useSelector(state => recipesSelectors.selectById(state, id));
  const [name, setName] = useState(edit ? recipe.name : '');
  const [description, setDescription] = useState(edit ? recipe.description : '');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState(edit ? recipe.ingredients : []);
  const [instructions, setInstructions] = useState(edit ? recipe.instructions.map(i => i.body) : ['']);
  const [errors, setErrors] = useState({});

  const options = ingredientList.filter(il => il.name.includes(ingredientInput)
    && !ingredients.some(i => i.id === il.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newRecipe = {
      name,
      description,
      ingredients,
      instructions: instructions.map((instruction, index) => (
        { order: index + 1, body: instruction }
      )),
    };

    if (edit) {
      newRecipe.id = recipe.id;
      dispatch(updateRecipe(newRecipe))
        .unwrap()
        .then((r) => {
          navigate(`/recipes/${r.id}`);
        })
        .catch((err) => {
          setErrors(err);
        });
    }
    else {
      dispatch(addRecipe(newRecipe))
        .unwrap()
        .then((r) => {
          navigate(`/recipes/${r.id}`);
        })
        .catch((err) => {
          setErrors(err);
        });
    }
  };

  return (
    <form id="recipeForm" onSubmit={handleSubmit}>
      <header>
        <h2>Create your recipe</h2>
      </header>
      <main>
        <div className="formField">
          <label htmlFor="name">Name</label>
          <div className="inputContainer">
            <input
              className="input"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <p className="error">{errors.name}</p>
          </div>
        </div>
        <div className="formField">
          <label htmlFor="description">Description (optional)</label>
          <div className="inputContainer">
            <textarea
              className="input"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <p className="error">{errors.description}</p>
          </div>
        </div>
        <div className="formField">
          <label htmlFor="ingredients">Ingredients</label>
          <div className="inputContainer">
            <ul className="ingredients">
              {ingredients.map(ingredient => (
                <li
                  className="ingredient"
                  key={ingredient.id}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setIngredients(prev => prev.filter(i => i.id !== ingredient.id))}
                >
                  <span>{ingredient.name}</span>
                  <span>(-)</span>
                </li>
              ))}
            </ul>
            <input
              className="input"
              id="ingredients"
              value={ingredientInput}
              onChange={e => setIngredientInput(e.target.value)}
            />
            <ul className="options">
              {options.map(option => (
                <li
                  className="option"
                  key={option.id}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setIngredients(prev => [...prev, option])}
                >
                  <span>{option.name}</span>
                  <span>(+)</span>
                </li>
              ))}
            </ul>
            <p className="error">{errors.ingredients ? 'Must have at least one ingredient' : ''}</p>
          </div>
          <div className="formField">
            <ol className="instructions">
              {instructions.map((instruction, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="instruction" key={index}>
                  <span>
                    {`${index + 1}. `}
                  </span>
                  <textarea
                    value={instruction}
                    onChange={e => setInstructions((prev) => {
                      prev[index] = e.target.value;
                      return [...prev];
                    })}
                  />
                  {instructions.length > 1 && (
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setInstructions(prev => prev.filter((_, i) => i !== index))}
                    >
                      Remove
                    </button>
                  )}
                  <p className="error">{errors.instructions?.[index]?.body}</p>
                </li>
              ))}
            </ol>
            <button
              className="btn"
              type="button"
              onClick={() => setInstructions(prev => [...prev, ''])}
            >
              Add another instruction
            </button>
          </div>
        </div>
      </main>
      <footer>
        <div className="buttons">
          <button className="btn" type="submit">{edit ? 'Confirm' : 'Create'}</button>
        </div>
      </footer>
    </form>
  );
};

export default RecipeForm;
