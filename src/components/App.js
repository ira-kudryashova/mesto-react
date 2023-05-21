import React, { useEffect, useState } from 'react';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js';

function App() {
  /** стейты */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({}); /** создаем переменную состояния, отвечающую за данные пользователя из апи. Стейт данных текущего пользователя*/
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false); /** переменная для отслеживания состояния загрузки во время ожидания ответа от сервера */

  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([currentUser, initialCards]) => {
        setCurrentUser(currentUser);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setDeletedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  /** обработчик лайка на карточках */
  function handleCardLike(card) {
    /** снова проверяем, есть ли уже лайк на карточке */
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );
    /** запрос в апи и получение новых данных карточки */
    api
      .toggleLikeCard(
        card._id,
        !isLiked
      )
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** универсальная функция, которая принимает функцию запроса */
  function handleSubmit(request) {
    /** изменяем текст кнопки до вызова запроса */
    setIsLoading(true);
    request()
      /** закрывать попап нужно только в `then` */
      .then(closeAllPopups)
      /** в каждом запросе ловим ошибку */
      /** console.error обычно используется для логирования ошибок, если никакой другой обработки ошибки нет */
      .catch(console.error)
      /** в каждом запросе в `finally` возвращаем обратно начальный текст кнопки */
      .finally(() => setIsLoading(false));
  }

  /** обработчик удаления карточки */
  function handleCardDelete(card) {
    function makeRequest() {
      return api.removeCardApi(card._id).then(() => {setCards((cards) => cards.filter((c) => c._id !== card._id))
    })}
    handleSubmit(makeRequest);
  }

  /** обработчик редактирования данных пользователя */
  function handleUpdateUser(inputValues) {
    function makeRequest()  {
      return api.editUserInfo(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  /** обработчик редактирования аватара пользователя */
  function handleUpdateAvatar(inputValues) {
    function makeRequest() {
      return api.editUserAvatar(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  
  /** обработчик добавления новой карточки */
  function handleAddPlaceSubmit(inputValues) {
    function makeRequest() {
      return api.addCards(inputValues).then((newCard) => {
        setCards([newCard,...cards,]);
      })}
    handleSubmit(makeRequest)  
  }

  /** закрытие всех попап */
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setDeletedCard({});
    setSelectedCard({});
  }

  return (
    <AppContext.Provider value = {{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='root'>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleDeleteClick}
            onConfirmDelete={handleDeleteClick}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen} //TODO: добавить ux и оверлей лдя всех попап
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            card={deletedCard}
            onSubmit={handleCardDelete}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
            />

        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
