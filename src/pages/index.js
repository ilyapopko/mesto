import './index.css';

import Api from '../components/Api.js';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithLoading from '../components/PopupWithLoading.js';

import UserInfo from "../components/UserInfo.js";
import {editProfileButton, addCardButton, editAvatarButton, selectors} from '../utils/constants.js';

//* Инициализация Лоадера начальной загрузки
const popupLoader = new PopupWithLoading('.popup_loader-screen');
popupLoader.open();

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
const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleSubmitEditProfile, new FormValidator('.popup_edit-profile', selectors));
popupEditProfile.setEventListeners();

//* Обработчик корректировки данных профиля на сервере
function handleSubmitEditProfile(inputData) {
  popupEditProfile.showLoadingProcess();
  apiServer.updateUserProperties(inputData)
    .then(returnedData => {
      userInfo.setUserInfo(returnedData);
      popupEditProfile.hideLoadingProcess();
      popupEditProfile.close();
    })
    .catch(err => {
      console.log(err);
    });
  }

//* Обработчик открытия окна редактирования профиля
editProfileButton.addEventListener('click', () => {
  popupEditProfile.open(userInfo.getUserInfo());
});

//* Обработчик корректировки аватарки на сервере
function handleSubmitEditAvatar({avatar}) {
  popupEditAvatar.showLoadingProcess();
  apiServer.updateUserAvatar(avatar)
    .then(returnedData => {
      userInfo.setUserInfo(returnedData);
      currentUserId = returnedData._id;
      popupEditAvatar.hideLoadingProcess();
      popupEditAvatar.close();
    })
    .catch(err => {
      console.log(err);
    });
  }

//* Окошко редактирования аватарки со своим валидатором
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleSubmitEditAvatar, new FormValidator('.popup_edit-avatar', selectors));
popupEditAvatar.setEventListeners();

//* Обработчик открытия окна редактирования аватарки
editAvatarButton.addEventListener('click', () => {
  popupEditAvatar.open(userInfo.getUserInfo());
});

//* Окошко просмотра картинки карточки
const popupViewCard = new PopupWithImage('.popup_view-card');
popupViewCard.setEventListeners();


//* Обработчик удаления карточки на сервере
function handleConfirmDeleteCard(card) {
  apiServer.deleteCard(card.getIdCard())
    .then(() => {
      card.delete();
      popupDeleteCard.close();
    })
    .catch(err => {
      console.log(err);
    });
}

//* Окошко подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_confirm-delete', handleConfirmDeleteCard);
popupDeleteCard.setEventListeners();

//* Обработчик клика на карточку
function handleCardClick(name, link) {
  popupViewCard.open(name, link);
}

//* Обработчик кнопки удаления карточки
function handleDeleteCard() {
  // popupWarningWindow.open(element);
  popupDeleteCard.open(this);
}

//* Обработчик клика на сердечко
function handleLikeClick () {
  apiServer.setLikeCard(this.isLiked(), this.getIdCard())
  .then(dataCard => {
    this.setLikes(dataCard.likes);
  });
}

//* Вспомогательная функция для не дублирования кода генерации карточки при создании
function renderedCard(data, currentUserId) {
  const element = new Card(data, '#card-template', handleCardClick, handleDeleteCard, handleLikeClick, currentUserId);
  return element.generateCard();
}

//* Обработчик добавления карточки на сервер
function handleSubmitAddCard(inputData) {
  popupAddCard.showLoadingProcess();
  apiServer.addCard(inputData)
  .then((returnedData) => {
    cardsContainer.prependItem(renderedCard(returnedData, currentUserId));
    popupAddCard.close();
    popupAddCard.hideLoadingProcess();
  })
  .catch(err => {
    console.log(err);
  });
}

//* Окошко добавления карточки со своим валидатором
const popupAddCard = new PopupWithForm('.popup_add-card', handleSubmitAddCard, new FormValidator('.popup_add-card', selectors));
popupAddCard.setEventListeners();

//* Обработчик открытия окна добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

//* Инициализация объекта списка карточек
const cardsContainer = new Section('.cards', (item) => {
  cardsContainer.appendItem(renderedCard(item, currentUserId));
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
  console.log(err);
})
.finally(() => {
  popupLoader.close();
});

