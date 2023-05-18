import React,  { useEffect, useState } from 'react';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup} from './AddPlacePopup.js';
import { ConfirmDeletePopup } from  './ConfirmDeletePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({}); /** создаем переменную состояния */
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState('')

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
    setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
  }

  function handleCardLike(card) {
    /** снова проверяем, есть ли уже лайк на карточке */
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    /** отправляем запрос в апи и получаем олбновленные данные карточки */
    // api.addCardLike(card._id, !isLiked).then((newCard) => {
    //   //проверить метод
    //   setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    // });
    api
      .toggleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api
      .removeCardApi(card._id)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
  }

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

  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
  };

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
        />
        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <ConfirmDeletePopup 
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete} />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          card={deletedCard}
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
