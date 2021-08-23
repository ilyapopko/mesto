import Popup from "./Popup.js";

export default class PopupWithLoading extends Popup {

  constructor(selector) {
    super(selector);
  }

  open() {
    this._dialog.classList.add('popup_opened');
  }

  close() {
    this._dialog.classList.remove('popup_opened');
  }
}
