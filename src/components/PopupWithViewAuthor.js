import Popup from "./Popup.js";

export default class PopupWithViewAuthor extends Popup {
  _elementAvatar
  _elementName
  _elementAbout

  constructor(selector) {
    super(selector);
    this._elementAvatar = this._dialog.querySelector('.popup__card-author-avatar');
    this._elementName = this._dialog.querySelector('.popup__card-author-name');
    this._elementAbout = this._dialog.querySelector('.popup__card-author-about');
  }

  _setPosition(x, y, relativeY) {
    this._dialog.style.left = x - this._dialog.offsetWidth + 75 + "px";
    if (relativeY >= this._dialog.offsetHeight) {
      this._dialog.style.top = y - this._dialog.offsetHeight - 12 + "px";
    } else {
      this._dialog.style.top = y + 12 + "px";
    }
  }

  show({ pageX, pageY, clientY }, {name, about, avatar}) {
    this._elementName.textContent = name;
    this._elementAbout.textContent = about;
    this._elementAvatar.src = avatar;
    this._setPosition(pageX, pageY, clientY);
    super.show();
  }

}
