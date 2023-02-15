import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSelectors } from '../../../store/ingredients';
import { getSessionUser } from '../../../store/session';
import { addToPantry, removeFromPantry, pantrySelectors } from '../../../store/pantry';
import './index.scss';

const Pantry = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getSessionUser);
  const ingredients = useSelector(ingredientsSelectors.selectAll);
  const pantry = useSelector(pantrySelectors.selectAll);
  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  const options = ingredients.filter(il => il.name.includes(input)
    && !pantry.some(i => i.id === il.id)
    && !addList.some(i => i.id === il.id));

  const reset = () => {
    setInput('');
    setAddList([]);
    setRemoveList([]);
    setEdit(false);
  };

  const confirm = async () => {
    if (addList.length) {
      await dispatch(addToPantry({ userId: sessionUser.id, ingredients: addList }));
    }
    if (removeList.length) {
      await dispatch(removeFromPantry({ userId: sessionUser.id, ingredients: removeList }));
    }

    reset();
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="pantry">
      {edit && (
        <>
          <div className="searchIngredients" ref={ref}>
            <input
              className="input"
              value={input}
              onClick={() => setShowMenu(!showMenu)}
              onChange={e => setInput(e.target.value)}
            />
            {showMenu && (
              <ul className="options">
                {options.map(option => (
                  <li
                    className="option"
                    key={option.id}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => setAddList(prev => [...prev, option])}
                  >
                    <span>(+)</span>
                    {option.verified && <span>✔️</span>}
                    <span>{option.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="addList">
            <p>To be added:</p>
            <ul className="ingredientList">
              {addList.map(ingredient => (
                <li
                  className="ingredient"
                  key={ingredient.id || ingredient.name}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setAddList(prev => prev.filter(i => i.name !== ingredient.name))}
                >
                  <span>(-)</span>
                  <span>{ingredient.name}</span>
                  {ingredient.verified && <span>✔️</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="removeList">
            <p>To be removed:</p>
            <ul className="ingredientList">
              {removeList.map(ingredient => (
                <li
                  className="ingredient"
                  key={ingredient.id}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setRemoveList(prev => prev
                    .filter(i => i.name !== ingredient.name))}
                >
                  <span>(+)</span>
                  <span>{ingredient.name}</span>
                  {ingredient.verified && <span>✔️</span>}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="ingredients">
        <p>My ingredients:</p>
        <ul className="ingredientList">
          {edit ? (
            pantry.filter(i => !removeList.some(r => r.id === i.id)).map(ingredient => (
              <li
                className="ingredient"
                key={ingredient.id}
                role="menuitem"
                tabIndex={0}
                onClick={() => setRemoveList(prev => [...prev, ingredient])}
              >
                <span>(-)</span>
                <span>{ingredient.name}</span>
                {ingredient.verified && <span>✔️</span>}
              </li>
            ))
          ) : (
            pantry.map(ingredient => (
              <li className="ingredient" key={ingredient.id}>
                <span>{ingredient.name}</span>
                {' '}
                {ingredient.verified && <span>✔️</span>}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="buttons">
        {edit ? (
          <>
            <button
              className="btn"
              type="button"
              onClick={confirm}
            >
              Confirm
            </button>
            <button
              className="btn"
              type="button"
              onClick={reset}
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
    </div>
  );
};

export default Pantry;
