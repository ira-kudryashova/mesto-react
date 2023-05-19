import React,  { useEffect, useState } from 'react';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup} from './AddPlacePopup.js';
import { ConfirmDeletePopup } from  './ConfirmDeletePopup.js';

function App() {
  /** стейты */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});  /** создаем переменную состояния, отвечающую за данные пользователя из апи. Стейт данных текущего пользователя*/
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState('')

  /** эффект при монитровании, который вызывает api.getUserInfoApi и обновляет стейт-переменную */
  useEffect(() => {
    api
      .getUserInfoApi()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards() //получили массив карточек с апи
      .then((res) => {
        setCards(res); //устанавливаем массив в стейт
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  //     .then(([currentUser, initialCards]) => {
  //       setCurrentUser(currentUser);
  //       setCards(initialCards);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  

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
    const isLiked = card.likes.some((i) => i._id === currentUser._id); /** снова проверяем, есть ли уже лайк на карточке */
    api
      .toggleLikeCard(card._id, !isLiked) /** запрос в апи и получение новых данных карточки */
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /** обработчик удаления карточки */
  function handleCardDelete(card) {
    api //TODO: добавить ux
      .removeCardApi(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id)); /** обновление стейта cards методом filter после запроса апи: создаем копию масима без удаленной карточки */
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** обработчик редактирования данных пользователя */
  function handleUpdateUser(newUserInfo) {
    api
      .editUserInfo(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /** обработчик редактирования аватара пользователя */
  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /** обработчик добавления новой карточки */
  function handleAddPlaceSubmit(data) {
    api
      .addCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]); /** обновление стейта cards с помощью расширенной копии текущего массива через оператор '...' */
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
  };

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
          onConfirmDelete = {handleDeleteClick}
        />
        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} //TODO: добавить ux и оверлей лдя всех попап
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} /> 

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <ConfirmDeletePopup 
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          card={deletedCard}
          onSubmit={handleCardDelete} />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} />

        {/* <template id='card__template' /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
