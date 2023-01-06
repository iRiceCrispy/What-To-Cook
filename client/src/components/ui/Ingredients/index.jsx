import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSelectors } from '../../../store/ingredients';
import { getSessionUser } from '../../../store/session';
import { addUserIngredients, userIngredientsSelectors } from '../../../store/userIngredients';

const Ingredients = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getSessionUser);
  const ingredientList = useSelector(ingredientsSelectors.selectAll);
  const ingredients = useSelector(userIngredientsSelectors.selectAll);
  const [addList, setAddList] = useState([]);
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState(false);

  const options = ingredientList.filter(il => il.name.includes(input)
    && !ingredients.some(i => i.id === il.id)
    && !addList.some(i => i.id === il.id));

  const addIngredients = () => {
    dispatch(addUserIngredients({ userId: sessionUser.id, ingredients: addList }))
      .then(() => {
        setInput('');
        setAddList([]);
        setEdit(false);
      });
  };

  const cancel = () => {
    setInput('');
    setAddList([]);
    setEdit(false);
  };

  return (
    <div className="ingredients">
      {edit && (
        <>
          <div className="searchIngredients">
            <input value={input} onChange={e => setInput(e.target.value)} />
            <ul className="options">
              All ingredients:
              {options.map(option => (
                <li
                  className="option"
                  key={option.id}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setAddList(prev => [...prev, option])}
                >
                  <span>{option.name}</span>
                  {' '}
                  {option.verified && <span>✔️</span>}
                  {' '}
                  <span> +</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="addList">
            To be added:
            {addList.map(item => (
              <li
                className="item"
                key={item.id || item.name}
                role="menuitem"
                tabIndex={0}
                onClick={() => setAddList(prev => prev.filter(i => i.name !== item.name))}
              >
                <span>{item.name}</span>
                {' '}
                {item.verified && <span>✔️</span>}
                {' '}
                <span> -</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <ul className="ingredientList">
        {ingredients.map(ingredient => (
          <li className="ingredient" key={ingredient.id}>
            <span>{ingredient.name}</span>
            {' '}
            {ingredient.verified && <span>✔️</span>}
          </li>
        ))}
      </ul>
      {edit ? (
        <>
          <button
            className="btn"
            type="button"
            onClick={addIngredients}
          >
            Confirm
          </button>
          <button
            className="btn"
            type="button"
            onClick={cancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className="btn"
          type="button"
          onClick={() => setEdit(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default Ingredients;
