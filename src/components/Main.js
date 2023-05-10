import React from 'react';
import '../index.css';
import { api } from '../utils/Api.js'
import { Card } from './Card.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const [ userName, setUserName ] = React.useState('');
  const [ userDescription, setUserDescription ] = React.useState('');
  const [ userAvatar, setUserAvatar ] = React.useState('');

  const [ cards, setCards ] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfoApi()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err)
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  return (
    <div className='Main'>
      <main className='content'>
        <section className='profile'>
          <img
            className='profile__avatar'
            // src='https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fG1lbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
            src={ userAvatar }
            alt='Аватар пользователя'
          />
          <button
            type='button'
            className='profile__avatar-edit'
            aria-label='Редактирование аватара пользователя'
            onClick={ onEditAvatar }
          />
          <div className='profile__info'>
            <h1 className='profile__name'>{ userName }</h1>
            <button
              className='profile__edit-button'
              type='button'
              aria-label='кнопка редактирования профиля'
              onClick={ onEditProfile }
            />
            <p className='profile__job'>{ userDescription }</p>
          </div>
          <button
            className='profile__add-button'
            type='button'
            aria-label='Кнопка добавления фотографии'
            onClick={ onAddPlace }
          />
        </section>
        <section className='cards' aria-label='Фотографии'>
          {cards.map((card) =>
            <Card
              key = { card._id }
              card = { card }
              onCardClick = { onCardClick } />
          )} 
        </section>
        <template id="card__template" />
      </main>
    </div>
  );
}

export { Main };
