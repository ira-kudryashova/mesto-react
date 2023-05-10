function PopupWithForm({ popup, isOpen, title, name, text, children, onClose, onSubmit }) {

  const popupOpened = isOpen ? 'popup_opened' : '';

  function handleCloseClick(e) {
    if ( e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) 
    {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_${popup} ${popupOpened}`}>
      <div className='popup__container'>
        <form 
            className = 'form'
            name = { name } 
            onSubmit = { onSubmit }
            noValidate>
          
          <button className='popup__close' type='button' onClick={ handleCloseClick } />
          <h2 className='form__name'>{ title }</h2>

          {children}

          <button
            className='form__submit-button'
            type='submit'
            aria-label='Кнопка сохранения изменений в профиле'
            //disabled
          >
            { text }
          </button>
        </form>
      </div>
    </div>
  );
}

export { PopupWithForm };
