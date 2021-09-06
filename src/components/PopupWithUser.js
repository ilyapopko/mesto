import Popup from "./Popup.js";

export default class PopupWithUser extends Popup {
  _closeButton

  constructor(selector) {
    super(selector);
    this._closeButton = this._dialog.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.hide();
    }
  }

  setEventListeners() {
    this._dialog.addEventListener('mousedown', (evt) => {
      if (evt.target === this._dialog || evt.target === this._closeButton) {
        this.hide();
      }
    });
  }

  show() {
    document.addEventListener('keydown', this._handleEscClose);
    this._dialog.classList.add('popup_smooth-control');
    super.show();
  }

  hide() {
    document.removeEventListener('keydown', this._handleEscClose);
    super.hide();
  }

}
