
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards} from './constants.js';

//Элементы на главной странице
// const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
//Элементы с профилем формы
const popupProfileForm = document.querySelector('.popup_edit-profile');
const formProfile = document.querySelector('#formEditProfile');
const profileNameAuthor = document.querySelector('.profile__name');
const inputNameAuthor = document.querySelector('#author-name');
const profileSpecialization = document.querySelector('.profile__specialization');
const inputSpecialization = document.querySelector('#author-specialization');
//Элементы с добавлением карточки
const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = document.querySelector('#formAddCard');
const inputCardName = document.querySelector('#place-name');
const inputCardLink = document.querySelector('#place-link');
//Элементы с окном просмотра
const popupViewCard = document.querySelector('.popup_view-card');
const popupViewImage = document.querySelector('.popup__image');
const popupViewDesc = document.querySelector('.popup__photo-caption');

//*Глобальный объект с описанием полей валидации
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__edit-field_type-error',
  errorClass: 'popup__input-error_visible'
};

//Глобальная функция открытия диалогового окна
function openFormDialog(dialog) {
  dialog.classList.add('popup_opened');
  dialog.addEventListener('mousedown', clickPopupElements);
  document.addEventListener('keydown', closePopupForEsc);

  if (selectors.formSelector === '.popup_edit-profile' || selectors.formSelector === '.popup_add-card') {
    const formValidator = new FormValidator(selectors, dialog);
    formValidator.enableValidation();
  }
}

//*Глобальная функция закрытия диалогового окна
function closeFormDialog(dialog) {
  dialog.classList.remove('popup_opened');
  dialog.removeEventListener('mousedown', clickPopupElements);
  document.removeEventListener('keydown', closePopupForEsc);
}

//*Глобальная функция обработки клика на элементах (выход по оверлею)
function clickPopupElements (evt) {
  const element = evt.target;
  if (element === evt.currentTarget || element.classList.contains('popup__reset-button')) {
    closeFormDialog(evt.currentTarget);
  }
}

//* Глобальная функция выхода по нажатию кнопки "Escape"
function closePopupForEsc (evt) {
  if (evt.key === 'Escape') {
    const openForm = document.querySelector('.popup_opened');
    if (openForm) {
      closeFormDialog(openForm);
    }
  }
}

//*Функция открытия окна просмотра
const openViewImage = function(card) {
  popupViewImage.src = card.getImage();
  popupViewImage.alt = "Фотография " + card.getName();
  popupViewDesc.textContent = card.getName();
  selectors.formSelector = '';
  openFormDialog(popupViewCard);
}

//*Функция добавления карточки в список
function addCardIntoContainer(name, src) {
  const element = new Card(name, src, '#card-template', openViewImage)
  cardsContainer.prepend(element.generateCard());
}

//*Глобальные функции главного окна

//*Обработчик клика на кнопке редактирования профиля
editProfileButton.addEventListener('click', () => {
  inputNameAuthor.value = profileNameAuthor.textContent;
  inputSpecialization.value = profileSpecialization.textContent;
  selectors.formSelector = '.popup_edit-profile';
  openFormDialog(popupProfileForm);
});

//*Обработчик изменения профиля (сохранение с закрытием диалоговой формы)
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileNameAuthor.textContent = inputNameAuthor.value;
  profileSpecialization.textContent = inputSpecialization.value;
  closeFormDialog(popupProfileForm);
});

//*Обработчик клика на кнопке добавления карточки
addCardButton.addEventListener('click', () => {
  formAddCard.reset();
  selectors.formSelector = '.popup_add-card';
  openFormDialog(popupAddCard);
});

//*Обработчик добавления карточки в список (сохранение с закрытием диалоговой формы)
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCardIntoContainer(inputCardName.value, inputCardLink.value);
  closeFormDialog(popupAddCard);
});

//этот код был вверху чтобы не мешаться "по ногами" - ибо его все равно удалять через несколько итераций
initialCards.reverse();
initialCards.forEach(function (item) {
  addCardIntoContainer(item.name, item.link);
});


//Старые функции для справки

//*Функция создания карточки
// function createCard(name, src) {
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   const linkImage = cardElement.querySelector('.card__image');
//   const deleteButton = cardElement.querySelector('.card__delete-button');
//   const likeButton = cardElement.querySelector('.card__like-button');
//   const placeCaption = cardElement.querySelector('.card__caption');
//   linkImage.src = src;
//   linkImage.alt = 'Фотография ' + name;
//   placeCaption.textContent = name;
//   linkImage.addEventListener('click', () => openViewImage(name, src));
//   deleteButton.addEventListener('click', deleteCard);
//   likeButton.addEventListener('click', toggleFlagLike);
//   return cardElement;
// }

//*Функция удаления карточки из списка
// function deleteCard(evt) {
//   const element = evt.target.closest('.card');
//   element.remove();
// }

// //*Функция обработки лайка на карточке
// function toggleFlagLike(evt) {
//   evt.target.classList.toggle('card__like-button_active');
// }

