import { PopupWithForm } from './PopupWithForm.js'

function ConfirmDeletePopup({ card, isOpen, onClose, onSubmit}) {

    function handleConfirmDelete(e) {
        e.preventDefault();
        onSubmit(card);
    }

    return(
        <PopupWithForm
          name='popup-delete'
          title='Вы уверены?'
          text='Да'
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleConfirmDelete}
        >
        </PopupWithForm>
    )
}

export { ConfirmDeletePopup };