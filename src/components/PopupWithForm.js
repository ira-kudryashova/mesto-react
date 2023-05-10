/** Вынеcли общий компонент попапов */
/** В этих попапах много общей разметки: элементы внешнего и внутреннего контейнера, сама форма, заголовок и две кнопки. 
 * Вся общая разметка в новом компоненте */

function PopupWithForm({ popup, isOpen, title, name, text, children, onClose, onSubmit }) {

  const popupOpened = isOpen ? 'popup_opened' : ''; //на основе пропcа isOpen в JSX задается CSS-класс, отвечающий за видимость попапа
  // Кроме заголовка и идентификатора в компонент PopupWithForm будет передаваться вложенное содержимое в виде JSX-разметки, отличающейся для всех четырёх попапов. 
  //Внутри самого компонента оно будет доступно через специальный пропс children

  // function handleCloseClick(e) { //TODO: переделать, разные варианты закрытия попап нужно будет прописывать в App
  //   if ( e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) 
  //   {
  //     onClose();
  //   }
  // }

  return (
    <div className={`popup popup_type_${popup} ${popupOpened}`}>
      <div className='popup__container'>
        <form 
            className = 'form'
            name = { name } 
            onSubmit = { onSubmit } 
            noValidate>
          
          <button className='popup__close' type='button' onClick={ onClose } />
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

