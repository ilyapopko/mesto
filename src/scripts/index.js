import './../pages/index.css';

import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {initialCards, editProfileButton, selectors, addCardButton} from './constants.js';

//* Осталась единственная вспомогательная функция для не дублирования кода генерации карточки при создании
function createCard(data) {
  const element = new Card(data.name, data.link, '#card-template', (name, src)=>{
    popupViewCard.open(name, src);
  });
  return element.generateCard();
}

//* Инициализация сведений о пользователе
const userInfo = new UserInfo('.profile__name','.profile__specialization');

//* Окошко просмотра картинки карточки
const popupViewCard = new PopupWithImage('.popup_view-card');
popupViewCard.setEventListeners();

//* Окошко редактирования профиля пользователя со своим валидатором
const popupEditProfile = new PopupWithForm('.popup_edit-profile',(data) => {
  userInfo.setUserInfo(data.user, data.specialization);
}, new FormValidator('.popup_edit-profile', selectors));
popupEditProfile.setEventListeners();

//* Обработчик открытия окна редактирования профиля
editProfileButton.addEventListener('click', () => {
  popupEditProfile.open(userInfo.getUserInfo());
});

//* Окошко добавления карточки со своим валидатором
const popupAddCard = new PopupWithForm('.popup_add-card', (data)=>{
  cardsContainer.addItem(createCard(data));
}, new FormValidator('.popup_add-card', selectors));
popupAddCard.setEventListeners();

//* Обработчик открытия окна добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

//* Объект списка карточек
const cardsContainer = new Section({items: initialCards.reverse(), renderer: (item) => {
  cardsContainer.addItem(createCard(item));
}},'.cards');

//* Инициализация начального списка карточек
cardsContainer.render();
