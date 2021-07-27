export default class Card {
  constructor(name, src, templateSelector, handlerImageClick) {
    this._name = name;
    this._image = src;
    this._templateSelector = templateSelector;
    this._handlerViewImage = handlerImageClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handlerViewImage(this._name, this._image);
    });
    this._elementLikeButton.addEventListener('click', () => {
      this._toggleFlagLike();
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _toggleFlagLike() {
    this._elementLikeButton.classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {

    this._element = this._getTemplate();

    this._elementName = this._element.querySelector('.card__caption');
    this._elementImage = this._element.querySelector('.card__image');
    this._elementLikeButton = this._element.querySelector('.card__like-button');
    this._elementDeleteButton = this._element.querySelector('.card__delete-button');

    //Заполним значения полей
    this._elementName.textContent = this._name;
    this._elementImage.src = this._image;
    this._elementImage.alt = 'Фотография ' + this._name;

    //Установим обработчики событий
    this._setEventListeners();

    return this._element;
  }
}

