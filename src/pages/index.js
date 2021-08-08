import './index.css';

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards, editProfileButton, selectors, addCardButton} from '../utils/constants.js';

//* Вспомогательная функция для не дублирования кода генерации карточки при создании
function createCard(data) {
  const element = new Card(data, '#card-template', (name, src)=>{
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
  popupEditProfile.close();
}, new FormValidator('.popup_edit-profile', selectors));
popupEditProfile.setEventListeners();

//* Обработчик открытия окна редактирования профиля
editProfileButton.addEventListener('click', () => {
  popupEditProfile.open(userInfo.getUserInfo());
});

//* Окошко добавления карточки со своим валидатором
const popupAddCard = new PopupWithForm('.popup_add-card', (data)=>{
  cardsContainer.prependItem(createCard(data));
  popupAddCard.close();
}, new FormValidator('.popup_add-card', selectors));
popupAddCard.setEventListeners();

//* Обработчик открытия окна добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

//* Объект списка карточек
const cardsContainer = new Section({items: initialCards, renderer: (item) => {
  cardsContainer.appendItem(createCard(item));
}},'.cards');

//* Инициализация начального списка карточек
cardsContainer.render(initialCards);
