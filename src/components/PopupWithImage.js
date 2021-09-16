import PopupWithUser from "./PopupWithUser.js";

export default class PopupWithImage extends PopupWithUser {
  _fieldDesc
  _fieldImage
  _dataList
  _currentIndex

  constructor(selector) {
    super(selector);
    this._fieldDesc = this._dialog.querySelector('.popup__photo-caption');
    this._fieldImage = this._dialog.querySelector('.popup__image');
    this._handlePressButtonKeyboard = this._handlePressButtonKeyboard.bind(this);
  }

  _setDataImage({name, link}) {
    this._fieldDesc.textContent = name;
    this._fieldImage.src = link;
    this._fieldImage.alt = "Фотография " + name;
  }

  _nextImage() {
    if (this._currentIndex + 1 > this._dataList.length - 1) {
      this._currentIndex = 0;
    } else {
      this._currentIndex = this._currentIndex + 1;
    }
    this._setDataImage(this._dataList[this._currentIndex].getCardInfo());
  }

  _previousImage() {
    if (this._currentIndex - 1 < 0) {
      this._currentIndex = this._dataList.length - 1;
    } else {
      this._currentIndex = this._currentIndex - 1;
    }
    this._setDataImage(this._dataList[this._currentIndex].getCardInfo());
  }

  _handlePressButtonKeyboard(evt) {
    if (evt.key === 'ArrowRight') {
      this._nextImage();
    } else if (evt.key === 'ArrowLeft') {
      this._previousImage();
    }
  }

  show(currentIndex, dataList) {
    this._dataList = dataList;
    this._currentIndex = currentIndex;
    this._setDataImage(dataList[this._currentIndex].getCardInfo());
    document.addEventListener('keydown', this._handlePressButtonKeyboard);
    super.show();
  }

  hide() {
    document.removeEventListener('keydown', this._handlePressButtonKeyboard);
    super.hide();
  }

}
