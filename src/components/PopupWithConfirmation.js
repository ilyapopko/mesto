import PopupWithUser from './PopupWithUser.js';

export default class PopupWithConfirmation extends PopupWithUser {
  _form
  _card
  _handleSubmitForm
  _buttonSubmit

  constructor(selector, handleSubmitForm) {
    super(selector);
    this._form = this._dialog.querySelector('.popup__container');
    this._buttonSubmit = this._dialog.querySelector('.popup__save-button');
    this._handleSubmitForm = handleSubmitForm;
  }

  show(card) {
    this._card = card;
    super.show();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._card);
    });
  }

  showLoadingProcess() {
    this._buttonSubmit.textContent = "Удаление...";
  }

  hideLoadingProcess() {
    this._buttonSubmit.textContent = "Да";
  }
}
