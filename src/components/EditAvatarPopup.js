import React, { useContext, useEffect, useRef } from 'react';
import { PopupWithForm } from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault() ;
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    /** чистим инпуты */
    useEffect(() => {
        if (!isOpen) {
            avatarRef.current.value = currentUser.avatar
        } else {
            avatarRef.current.value = ''
        }
    }, [currentUser, isOpen])

    return(
        <PopupWithForm
        name='popup-avatar'
        title='Обновить аватар'
        text='Сохранить'
        // isOpen={isEditAvatarPopupOpen}
        // onClose={closeAllPopups}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <fieldset className='form__input-container'>
          <input
            type='url'
            name='link'
            id='link-avatar-input'
            className='form__item form__item_avatar_link'
            placeholder='Ссылка на картинку'
            required
            ref={avatarRef}
          />
          <span className='form__item-error link-avatar-input-error' />
        </fieldset>
      </PopupWithForm>
    )
}

export { EditAvatarPopup };


