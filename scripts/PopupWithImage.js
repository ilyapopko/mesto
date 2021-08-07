import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, src) {
    const viewDesc = this._dialog.querySelector('.popup__photo-caption');
    const viewImage = this._dialog.querySelector('.popup__image');
    viewDesc.textContent = name;
    viewImage.src = src;
    viewImage.alt = "Фотография " + name;
    super.open();
  }
}
