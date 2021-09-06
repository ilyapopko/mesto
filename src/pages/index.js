import './index.css';

import Api from '../components/Api.js';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from "../components/UserInfo.js";
import {editProfileButton, addCardButton, editAvatarButton, selectors} from '../utils/constants.js';

import PopupWithError from '../components/PopupWithError.js';
import Popup from '../components/Popup';

//TODO: Переделать
// import ToolTipWithLikes from '../components/ToolTipWithLikes.js';


//* Инициализация Лоадера начальной загрузки
const popupLoader = new Popup('.popup_type_loader');
popupLoader.show();

//* Инициализация окна с ошибкой
const errorPopup = new PopupWithError('.popup_type_error');


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
        elem.updateCardInfo(currentUserInfo);
      });
      popupEditProfile.hideLoadingProcess();
      popupEditProfile.hide();
    })
    .catch(err => {
      errorPopup.show(err);
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
      popupEditAvatar.hideLoadingProcess();
      popupEditAvatar.hide();
    })
    .catch(err => {
      errorPopup.show(err);
    });
  }

//* Окошко редактирования аватарки со своим валидатором
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', handleSubmitEditAvatar, new FormValidator('.popup_type_edit-avatar', selectors));
popupEditAvatar.setEventListeners();

//* Обработчик открытия окна редактирования аватарки
editAvatarButton.addEventListener('click', () => {
  popupEditAvatar.show(userInfo.getUserInfo());
});

//* Окошко просмотра картинки карточки
const popupViewCard = new PopupWithImage('.popup_type_view-card');
popupViewCard.setEventListeners();

//TODO: Переделать
//* Окошко просмотра лайков
// const toolTipLikes = new ToolTipWithLikes('.tool-tip_likes');

//* Обработчик удаления карточки на сервере
function handleConfirmDeleteCard(card) {
  popupDeleteCard.showLoadingProcess();
  apiServer.deleteCard(card.getCardInfo().id)
    .then(() => {
      cardsContainer.removeCardFromList(card);
      card.delete();
      popupDeleteCard.hide();
      popupDeleteCard.hideLoadingProcess();
    })
    .catch(err => {
      errorPopup.show(err);
    });
}

//* Окошко подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_confirm-delete', handleConfirmDeleteCard);
popupDeleteCard.setEventListeners();

//* Обработчик клика на карточку
function handleCardClick(name, link) {
  popupViewCard.show(name, link);
}

//* Обработчик кнопки удаления карточки
function handleDeleteCard() {
  popupDeleteCard.show(this);
}

//* Обработчик клика на сердечко
function handleLikeClick (evt) {
  //TODO: Переделать
  // toolTipLikes.hide();
  // this.showLoader();
  apiServer.setLikeCard(this.isLiked(), this.getCardInfo().id)
  .then(dataCard => {
    this.setLikes(dataCard.likes);
    //TODO: Переделать
    // this.hideLoader();
    // toolTipLikes.show(evt, this.getLikes(), currentUserId);
  })
  .catch((err) => {
    errorPopup.show(err);
  });
}

//TODO: Переделать
//* Обработчик наведения на сердечко
function handleLikeMouseOver (evt) {
  // toolTipLikes.show(evt, this.getLikes(), currentUserId);
}

//TODO: Переделать
//* Обработчик ухода с сердечка
function handleLikeMouseOut () {
  // toolTipLikes.hide();
}

//* Вспомогательная функция для не дублирования кода генерации карточки при создании
function createdCard(data, currentUserId) {
  const element = new Card(data, '#card-template', handleCardClick, handleDeleteCard, handleLikeClick, handleLikeMouseOver, handleLikeMouseOut, currentUserId);
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
    popupAddCard.hideLoadingProcess();
  })
  .catch(err => {
    errorPopup.show(err);
  });
}

//* Окошко добавления карточки со своим валидатором
const popupAddCard = new PopupWithForm('.popup_type_add-card', handleSubmitAddCard, new FormValidator('.popup_type_add-card', selectors));
popupAddCard.setEventListeners();

//* Обработчик открытия окна добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.show();
});

//* Инициализация объекта списка карточек
const cardsContainer = new Section('.cards', (item) => {
  const card = createdCard(item, currentUserId);
  cardsContainer.cardsList.push(card);
  cardsContainer.appendItem(card.generateCard());
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
    errorPopup.show(err);
  })
  .finally(() => {
    popupLoader.hide();
  });

