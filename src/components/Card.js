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
  _element
  _elementName
  _elementImage
  _elementLikeButton
  _elementDeleteButton
  _elementLikesCount


  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, currentUserId) {
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
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

  }

  _setLikeFlag(flag) {
    if (flag) {
      this._elementLikeButton.classList.add('card__like-button_active')
    } else {
      this._elementLikeButton.classList.remove('card__like-button_active')
    }
  }
  getIdCard() {
    return this._id;
  }
  getCardInfo() {
    return {id: this._id, name: this._name, link: this._link, element: this};
  }

  setCardInfo(name, link) {
    this._name = name;
    this.link = link;
  }

  isLiked() {
    return this._likes.some((likeUser) => {
      return this._currentUserId === likeUser._id});
  }

  setLikes(dataLikes) {
    if (dataLikes) {
      this._likes = dataLikes;
    }
    this._setLikeFlag(this.isLiked());
    this._elementLikesCount.textContent = this._likes.length;
    this._elementLikeButton.title = this._likes.length > 0 ? 'Отметили: ' + this._likes.map(item => item.name).join('; ') : 'Еще никто не отметил';
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
    this._elementLikesCount = this._element.querySelector('.card__like-count');

    //Заполним значения полей
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = 'Фотография ' + this._name;
    this._element.title = 'Добавил (автор): ' + this._owner.name;


    //Установим наличие лайка юзера
    this.setLikes();

    //Скроем корзину для не своих карточек
    if (this._currentUserId !== this._owner._id) {
      this._elementDeleteButton.style.display = 'none';
    }

    //Установим обработчики событий
    this._setEventListeners();

    return this._element;
  }
}

