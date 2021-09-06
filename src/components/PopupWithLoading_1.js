export default class PopupWithLoading {
  _dialog
  _loaderElement
  
  constructor(selector) {
    this._dialog = document.querySelector(selector);
    this._loaderElement = this._dialog.querySelector('.popup__loader');
  }

  show() {
    this._dialog.classList.add('popup_opened');
  }

  hide() {
    this._dialog.classList.remove('popup_opened');
  }

}
