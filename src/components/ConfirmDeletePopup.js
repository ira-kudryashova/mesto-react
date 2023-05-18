import { PopupWithForm } from './PopupWithForm.js'

function ConfirmDeletePopup({ card, isOpen, onClose, handleDeleteSabmit}) {

    function handleConfirmDelete(e) {
        e.prevent.default();
        handleDeleteSabmit(card);
    }

    return(
        <PopupWithForm
          name='popup-delete'
          title='Вы уверены?'
          text='Да'
          isOpen={isOpen}
          onClose={onClose}
          handleDeleteSabmit={handleConfirmDelete}
        >
        </PopupWithForm>
    )
}

export { ConfirmDeletePopup };