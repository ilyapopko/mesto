import PopupWithUser from "./PopupWithUser.js";

export default class PopupWithImage extends PopupWithUser {
  _fieldDesc
  _fieldImage

  constructor(selector) {
    super(selector);
    this._fieldDesc = this._dialog.querySelector('.popup__photo-caption');
    this._fieldImage = this._dialog.querySelector('.popup__image');
  }

  show(name, src) {
    this._fieldDesc.textContent = name;
    this._fieldImage.src = src;
    this._fieldImage.alt = "Фотография " + name;
    super.show();
  }
}
