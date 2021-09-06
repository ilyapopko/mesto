export default class Popup {
  _dialog

  constructor(selector) {
    this._dialog = document.querySelector(selector);
  }

  show() {
    this._dialog.classList.add('popup_opened');
  }

  hide() {
    this._dialog.classList.remove('popup_opened');
  }

}
