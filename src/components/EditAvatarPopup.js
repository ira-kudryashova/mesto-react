import React, { useContext, useEffect, useRef } from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext); /** подписка на контекст */
  const avatarRef = useRef(); /** реф для аватара */

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      /** значение инпута, полученное с помощью рефа */
      avatar:
        avatarRef.current
          .value,
    });
  }

  /** чистим инпуты */
  // useEffect(() => {
  //   if (!isOpen) {
  //     avatarRef.current.value = currentUser.avatar;
  //   } else {
  //     avatarRef.current.value = '';
  //   }
  // }, [currentUser, isOpen]);
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  return (
    <PopupWithForm
      name='popup-avatar'
      title='Обновить аватар'
      text='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='form__input-container'>
        <input
          type='url'
          name='avatar'
          id='link-avatar-input'
          className='form__item form__item_avatar_link'
          placeholder='Ссылка на картинку'
          required
          ref={avatarRef}
          onChange={handleChangeAvatar}
        />
        <span className='form__item-error link-avatar-input-error' />
      </fieldset>
    </PopupWithForm>
  );
}

export { EditAvatarPopup };
