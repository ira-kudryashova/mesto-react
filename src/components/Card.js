import React, { useContext } from 'react';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  
const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card._id);
  }

  //const currentUser = React.useContext(CurrentUserContext);
  
  /** определяем, является ли пользователь владельцем текущей карточки */
  const isOwn = card.owner._id === currentUser._id;

  /** Создаём переменную, которую после зададим в `className` для кнопки удаления */
  const cardDeleteButtonClass = (`card__trash ${isOwn ? 'card__trash_active' : ''}`);

  /** Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  /** Создаём переменную, которую после зададим в `className` для кнопки лайка */
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`);

  return (
    <article className='card'>
      <div className='card__image'>
        <img
          className='card__pic'
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
       <button /** используем переменную для условного рендеринга в разметке */
          className={cardDeleteButtonClass}
          type='button'
          aria-label='Значок удаления карточки'
          onClick={handleDeleteClick}
        />

      </div>
      <div className='card__description'>
        <h2 className='card__name'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Значок лайк'
            onClick={handleLikeClick}
          />
          <span className='card__like-number'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export { Card };
