import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import { api } from '../utils/Api.js';
import { Card } from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;
  // const [userName, setUserName] = useState('');
  // const [userDescription, setUserDescription] = useState('');
  // const [userAvatar, setUserAvatar] = useState('');

  //const [cards, setCards] = useState([]); //создали стейт под масив карточек

  // useEffect(() => {
  //   api
  //     .getUserInfoApi()
  //     .then((res) => {
  //       setUserName(res.name);
  //       setUserDescription(res.about);
  //       setUserAvatar(res.avatar);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //    });

  //   api
  //     .getInitialCards()//получили массив карточек с апи
  //     .then((res) => {
  //       setCards(res);//устанавливаем массив в стейт
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className='Main'>
      <main className='content'>
        <section className='profile'>
          <img
            className='profile__avatar'
            // src='https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fG1lbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
            src={avatar}
            alt='Аватар пользователя'
          />
          <button
            type='button'
            className='profile__avatar-edit'
            aria-label='Редактирование аватара пользователя'
            onClick={onEditAvatar}
          />
          <div className='profile__info'>
            <h1 className='profile__name'>{name}</h1>
            <button
              className='profile__edit-button'
              type='button'
              aria-label='кнопка редактирования профиля'
              onClick={onEditProfile}
            />
            <p className='profile__job'>{about}</p>
          </div>
          <button
            className='profile__add-button'
            type='button'
            aria-label='Кнопка добавления фотографии'
            onClick={onAddPlace}
          />
        </section>
        <section className='cards' aria-label='Фотографии'>
          {cards.map((card) => ( //с помощью мапа отрисовываем массив карточек
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick} />
          ))}
        </section>
        <template id='card__template' />
      </main>
    </div>
  );
}

export { Main };
