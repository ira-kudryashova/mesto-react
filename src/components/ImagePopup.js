import React from 'react';
import '../index.css';

function ImagePopup({ card, onClose }) {

  // function handleCloseClick(e) { //TODO: переделать, разные варианты закрытия попап нужно будет прописывать в App
  //   if ( e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) 
  //   {
  //     onClose();
  //   }
  // }

  return (
    // <div className={`popup popup-image ${isOpen ? `popup_opened` : ''}`}>
    <div 
      className={`popup popup-image ${card.link ? 'popup_opened' : ''}`}
      //onClick={ onClose }
      >
      <div className='popup-image__container'>
        <button
          type='button'
          className='popup__close'
          aria-label='Кнопка закрытия попап'
          onClick={ onClose }
        />
        <figure className='figure'>
          <img
            className='popup-image__pic'
            src={ card.link } 
            alt={ card.name }
          />
          <figcaption className='popup-image__title'>{ card.name }</figcaption>
        </figure>
      </div>
    </div>
  );
}

export { ImagePopup };
