export default class Popup {
  _dialog
  _resetButton

  constructor(selector) {
    this._dialog = document.querySelector(selector);
    this._resetButton = this._dialog.querySelector('.popup__reset-button');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._dialog.addEventListener('mousedown', (evt) => {
      const currentElement = evt.target;
      if (currentElement === this._dialog || currentElement === this._resetButton) {
        this.close();
      }
    });
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._dialog.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._dialog.classList.remove('popup_opened');
  }

}

