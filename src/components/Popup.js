export default class Popup {
  _dialog
  _closeButton

  constructor(selector) {
    this._dialog = document.querySelector(selector);
    this._closeButton = this._dialog.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._dialog.addEventListener('mousedown', (evt) => {
      const currentElement = evt.target;
      if (currentElement === this._dialog || currentElement === this._closeButton) {
        this.close();
      }
    });
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._dialog.classList.add('popup_opened');
    this._dialog.classList.add('popup_smooth-control');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._dialog.classList.remove('popup_opened');
  }

}

