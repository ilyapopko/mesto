import PopupWithUser from "./PopupWithUser.js";

export default class PopupWithImage extends PopupWithUser {
  _fieldDesc
  _fieldImage
  _currentIndex

  constructor(selector, handleLeftClick, handleRightClick) {
    super(selector);
    this._fieldDesc = this._dialog.querySelector('.popup__photo-caption');
    this._fieldImage = this._dialog.querySelector('.popup__image');
    this._buttonLeft = this._dialog.querySelector('.popup__previous-button');
    this._buttonRight = this._dialog.querySelector('.popup__next-button');
    this._handleLeftClick = handleLeftClick.bind(this);
    this._handleRightClick = handleRightClick.bind(this);
    this._handlePressButtonKeyboard = this._handlePressButtonKeyboard.bind(this);
  }

  _handlePressButtonKeyboard(evt) {
    if (evt.key === 'ArrowRight') {
      this._handleRightClick();
    } else if (evt.key === 'ArrowLeft') {
      this._handleLeftClick();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonLeft.addEventListener('click', () => {
      this._handleLeftClick();
    });
    this._buttonRight.addEventListener('click', () => {
      this._handleRightClick();
    });
  }

  setData({name, link}) {
    this._fieldDesc.textContent = name;
    this._fieldImage.src = link;
    this._fieldImage.alt = "Фотография " + name;
  }

  show(currentIndex) {
    this._currentIndex = currentIndex;
    document.addEventListener('keydown', this._handlePressButtonKeyboard);
    super.show();
  }

  hide() {
    document.removeEventListener('keydown', this._handlePressButtonKeyboard);
    super.hide();
  }

}
