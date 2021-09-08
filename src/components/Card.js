export default class Card {
  _name
  _link
  _owner
  _id
  _currentUserId
  _likes
  _templateSelector
  _handleCardClick
  _handleDeleteClick
  _handleLikeClick
  _handleLikeMouseOver
  _element
  _elementName
  _elementImage
  _elementLikeButton
  _elementDeleteButton
  _elementEditButton
  _elementGoSourceButton
  _elementLikesCount
  _elementAuthor


  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, handleLikeMouseOver, handleLikeMouseOut, handleCardGoSource, currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._id = data._id;
    this._likes = data.likes;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
    this._handleLikeMouseOver = handleLikeMouseOver.bind(this);
    this._handleLikeMouseOut = handleLikeMouseOut.bind(this);
    this._handleCardGoSource = handleCardGoSource.bind(this);
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._elementLikeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._elementGoSourceButton.addEventListener('click', () => {
      this._handleCardGoSource();
    });
    this._elementLikeButton.addEventListener('mouseover', (evt) => {
      this._handleLikeMouseOver(evt);
    });
    this._elementLikeButton.addEventListener('mouseout', (evt) => {
      this._handleLikeMouseOut();
    });
  }

  _setLikeFlag(flag) {
    if (flag) {
      this._elementLikeButton.classList.add('card__like-button_active')
    } else {
      this._elementLikeButton.classList.remove('card__like-button_active')
    }
  }

  getCardInfo() {
    return {id: this._id, name: this._name, link: this._link, element: this};
  }

  setCardInfo(name, link) {
    this._name = name;
    this.link = link;
  }

  getLikes() {
    return this._likes;
  }

  setLikes(dataLikes, preset = false ) {
    if (dataLikes) {
      this._likes = dataLikes;
    }
    this._setLikeFlag(preset === false ? this.isLiked() : !this.isLiked());
    this._elementLikesCount.textContent = this._likes.length + (preset === false ? 0 : 1);
  }

  isLiked() {
    return this._likes.some((likeUser) => {
      return likeUser._id === this._currentUserId});
  }


  delete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementName = this._element.querySelector('.card__caption');
    this._elementImage = this._element.querySelector('.card__image');
    this._elementLikeButton = this._element.querySelector('.card__like-button');
    this._elementDeleteButton = this._element.querySelector('.card__delete-button');
    this._elementEditButton = this._element.querySelector('.card__edit-button');
    this._elementGoSourceButton = this._element.querySelector('.card__go-source-button');
    this._elementLikesCount = this._element.querySelector('.card__like-count');
    this._elementAuthor = this._element.querySelector('.card__author');
    //Заполним значения полей
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = 'Фотография ' + this._name;
    this._elementAuthor.textContent = 'Добавил: ' + this._owner.name;

    //Установим наличие лайка юзера
    this.setLikes();

    //Скроем корзину для не своих карточек
    if (this._currentUserId !== this._owner._id) {
      this._elementDeleteButton.style.display = 'none';
      this._elementEditButton.style.display = 'none';
    }

    //Установим обработчики событий
    this._setEventListeners();
    return this._element;
  }

  updateCardInfo({name, id}) {
    if (this._owner._id !== id) {
      return;
    }
    this._owner.name = name;
    this._elementAuthor.textContent = 'Добавил: ' + name;
  }
}

