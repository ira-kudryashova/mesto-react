import React from 'react';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
  };

  return (
    <div className='root'>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
      <Footer />

      <PopupWithForm
        name="popup-profile"
        title="Редактировать профиль"
        text="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
          <fieldset className='form__input-container'>
              <input
                type='text'
                name='name'
                id='username-input'
                className='form__item form__item_user_name'
                placeholder='Имя'
                minLength={2}
                maxLength={40}
                required
              />
              <span className='form__item-error username-input-error' />
              <input
                type='text'
                name='job'
                id='job-input'
                className='form__item form__item_user_job'
                placeholder='О себе'
                minLength={2}
                maxLength={200}
                required
              />
              <span className='form__item-error job-input-error' />
            </fieldset>
        </PopupWithForm>

        <PopupWithForm 
        name="popup-add"
        title="Новое место"
        text="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
          <fieldset className='form__input-container'>
              <input
                type='text'
                name='name'
                id='cardname-input'
                className='form__item form__item_image_name'
                placeholder='Название'
                minLength={2}
                maxLength={30}
                required
              />
              <span className='form__item-error cardname-input-error' />
              <input
                type='url'
                name='link'
                id='link-input'
                className='form__item form__item_image_link'
                placeholder='Ссылка на картинку'
                required
              />
              <span className='form__item-error link-input-error' />
            </fieldset>
        </PopupWithForm>

        <PopupWithForm 
        name="popup-delete"
        title="Вы уверены?"
        text="Да" />

      <PopupWithForm 
        name="popup-avatar"
        title="Обновить аватар"
        text="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
          <fieldset className='form__input-container'>
              <input
                type='url'
                name='link'
                id='link-avatar-input'
                className='form__item form__item_avatar_link'
                placeholder='Ссылка на картинку'
                required
              />
              <span className='form__item-error link-avatar-input-error' />
            </fieldset>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
      {/* <template id='card__template' /> */}
    </div>
  );
}

export default App;
