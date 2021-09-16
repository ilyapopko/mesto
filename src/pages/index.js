import './index.css';

import Api from '../components/Api.js';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithError from '../components/PopupWithError.js';
import Popup from '../components/Popup.js';
import PopupWithViewLikes from '../components/PopupWithViewLikes.js';
import PopupWithViewAuthor from '../components/PopupWithViewAuthor.js';
import {editProfileButton, addCardButton, editAvatarButton, bugButton, selectors} from '../utils/constants.js';
import { formattingUserCount, goToPage } from "../utils/utils.js";

//* Инициализация Лоадера начальной загрузки
const popupLoader = new Popup('.popup_type_loader');
popupLoader.show();

//* Инициализация окна с ошибкой
const popupError = new PopupWithError('.popup_type_error');

//* Обработчик показа тестовой ошибки
bugButton.addEventListener('click', () => {
  popupError.show('Error 007: Это пример ошибки для демонстрации возможности оформления. :)');
});

//* Инициализация объекта с функционалом запросов
const apiServer = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '7da0d743-b2f7-439b-8a75-4db6d3ee0226',
    'Content-Type': 'application/json'
  }
});

//* Инициализация сведений о пользователе
const userInfo = new UserInfo('.profile__name','.profile__avatar','.profile__specialization');
let currentUserId = undefined;

//* Окошко редактирования профиля пользователя со своим валидатором
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', handleSubmitEditProfile, new FormValidator('.popup_type_edit-profile', selectors));
popupEditProfile.setEventListeners();

//* Обработчик корректировки данных профиля на сервере
function handleSubmitEditProfile(inputData) {
  popupEditProfile.showLoadingProcess();
  apiServer.updateUserProperties(inputData)
    .then(returnedData => {
      userInfo.setUserInfo(returnedData);
      const currentUserInfo = userInfo.getUserInfo();
      cardsContainer.cardsList.forEach((elem) => {
        elem.updateCardOwnerInfo(currentUserInfo);
      });
      popupEditProfile.hide();
    })
    .catch(err => {
      popupError.show(err);
    });
  }

//* Обработчик открытия окна редактирования профиля
editProfileButton.addEventListener('click', () => {
  popupEditProfile.show(userInfo.getUserInfo());
});

//* Обработчик корректировки аватарки на сервере
function handleSubmitEditAvatar({avatar}) {
  popupEditAvatar.showLoadingProcess();
  apiServer.updateUserAvatar(avatar)
    .then(returnedData => {
      userInfo.setUserInfo(returnedData);
      currentUserId = returnedData._id;
      popupEditAvatar.hide();
    })
    .catch(err => {
      popupError.show(err);
    });
  }

//* Окошко редактирования аватарки со своим валидатором
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', handleSubmitEditAvatar, new FormValidator('.popup_type_edit-avatar', selectors));
popupEditAvatar.setEventListeners();

//* Обработчик открытия окна редактирования аватарки
editAvatarButton.addEventListener('click', () => {
  popupEditAvatar.show(userInfo.getUserInfo());
});

//* Инициализация объекта списка карточек
const cardsContainer = new Section('.cards', (item) => {
  const card = createdCard(item, currentUserId);
  cardsContainer.cardsList.push(card);
  cardsContainer.appendItem(card.generateCard());
});

//* Обработчик клика на кнопку "Предыдущая картинка"
function handleLeftClick() {
  if (this._currentIndex - 1 < 0) {
    this._currentIndex = cardsContainer.cardsList.length - 1;
  } else {
    this._currentIndex = this._currentIndex - 1;
  }
  popupViewCard.setData(cardsContainer.cardsList[this._currentIndex].getCardInfo());
}

//* Обработчик клика на кнопку "Следующая картинка"
function handleRightClick() {
  if (this._currentIndex + 1 > cardsContainer.cardsList.length - 1) {
    this._currentIndex = 0;
  } else {
    this._currentIndex = this._currentIndex + 1;
  }
  popupViewCard.setData(cardsContainer.cardsList[this._currentIndex].getCardInfo());
}

//* Окошко просмотра картинки карточки
const popupViewCard = new PopupWithImage('.popup_type_view-card', handleLeftClick, handleRightClick);
popupViewCard.setEventListeners();

//* Окошко просмотра лайков
const popupViewLikes = new PopupWithViewLikes('.popup_type_views-likes', formattingUserCount);

//* Окошко просмотра автора
const popupViewAuthor = new PopupWithViewAuthor('.popup_type_views-card-author');

//* Обработчик клика на карточку
function handleCardClick() {
  popupViewCard.setData(this.getCardInfo());
  popupViewCard.show(cardsContainer.cardsList.indexOf(this));
}

//* Обработчик удаления карточки на сервере
function handleConfirmDeleteCard(card) {
  popupDeleteCard.showLoadingProcess();
  apiServer.deleteCard(card.getCardInfo().id)
    .then(() => {
      cardsContainer.removeCardFromList(card);
      card.delete();
      popupDeleteCard.hide();
    })
    .catch(err => {
      popupError.show(err);
    });
}

//* Окошко подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_confirm-delete', handleConfirmDeleteCard);
popupDeleteCard.setEventListeners();

//* Обработчик кнопки удаления карточки
function handleDeleteCard() {
  popupDeleteCard.show(this);
}

//* Обработчик перехода к источнику картинки
function handleCardGoSource() {
  goToPage(this.getCardInfo().link, true);
}

//* Обработчик клика на сердечко
function handleLikeClick (evt) {
  popupViewLikes.hide(); //Сначала скроем окошко просмотра лайков
  this.setLikes(undefined, true); //Далее установим флаг на карточке (предварительно), чтобы пользователь видел результат действия
  apiServer.setLikeCard(this.isLiked(), this.getCardInfo().id) //Выполним запрос на сервер с установкой лайка
  .then(dataCard => {
    this.setLikes(dataCard.likes);  //Произведем полноценную установка флага
  })
  .catch((err) => {
    this.setLikes();  //Это ошибка - откатим состояние кнопки в исходное положение
    popupError.show(err);
  })
  .finally(() => {
    popupViewLikes.show(evt, this.getLikes(), currentUserId); //Покажем окошко просмотра лайков
  });
}

//* Обработчик наведения на сердечко
function handleLikeMouseOver (evt) {
  popupViewLikes.show(evt, this.getLikes(), currentUserId);
}

//* Обработчик ухода с сердечка
function handleLikeMouseOut () {
  popupViewLikes.hide();
}

//* Обработчик наведения на автора
function handleAuthorMouseOver (evt) {
  popupViewAuthor.show(evt, this.getCardInfo().owner);
}

//* Обработчик ухода с автора
function handleAuthorMouseOut () {
  popupViewAuthor.hide();
}

//* Обработчик клика на кнопке редактирования карточки
function handleSubmitEditCard({name, link}) {
  popupEditCard.showLoadingProcess();

  const currentCard = this.getCurrentCard();
  //Удаляем
  apiServer.deleteCard(currentCard.getCardInfo().id)
  .catch(err => {
    popupError.show(err);
    return;
  });

  //Добавляем
  apiServer.addCard({name, link})
  .then((returnedData) => {
    currentCard.setCardInfo(returnedData);
  })
  .catch(err => {
    //удалим карточку из списка
    cardsContainer.removeCardFromList(currentCard);
    currentCard.delete();
    popupError.show(err);
  })
  .finally(() => {
    popupEditCard.hide();
  });

}

//* Окошко редактирования карточки со своим валидатором
const popupEditCard = new PopupWithForm('.popup_type_edit-card', handleSubmitEditCard,
                                          new FormValidator('.popup_type_edit-card', selectors));
popupEditCard.setEventListeners();

//* Обработчик клика на кнопке редактирования карточки
function handleEditCard() {
  popupEditCard.show(this.getCardInfo(), this);
}

//* Вспомогательная функция для не дублирования кода генерации карточки при создании
function createdCard(data, currentUserId) {
  const element = new Card(data, '#card-template', currentUserId, handleCardClick, handleDeleteCard,
                            handleLikeClick, handleLikeMouseOver, handleLikeMouseOut,
                            handleCardGoSource, handleEditCard, handleAuthorMouseOver, handleAuthorMouseOut);
  return element;
}

//* Обработчик добавления карточки на сервер
function handleSubmitAddCard(inputData) {
  popupAddCard.showLoadingProcess();
  apiServer.addCard(inputData)
  .then((returnedData) => {
    const card = createdCard(returnedData, currentUserId);
    cardsContainer.cardsList.push(card);
    cardsContainer.prependItem(card.generateCard());
    popupAddCard.hide();
  })
  .catch(err => {
    popupError.show(err);
  });
}

//* Окошко добавления карточки со своим валидатором
const popupAddCard = new PopupWithForm('.popup_type_add-card', handleSubmitAddCard, new FormValidator('.popup_type_add-card', selectors));
popupAddCard.setEventListeners();

//* Обработчик открытия окна добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.show();
});

//*Получение данных с сервера и заполнение полей
Promise.all([apiServer.getUserProperties(), apiServer.getAllCards()])
  .then(([dataUserInfo, dataInitialCard]) => {
    userInfo.setUserInfo(dataUserInfo);
    currentUserId = dataUserInfo._id;
    //Вывод всех карточек
    if (currentUserId) {
      cardsContainer.render(dataInitialCard);
    }
  })
  .catch(err => {
    popupError.show(err);
  })
  .finally(() => {
    popupLoader.hide();
  });

