
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from './constants.js';

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

function initializationValidation(formSelector, dialog) {
  selectors.formSelector = formSelector;
  const formValidator = new FormValidator(selectors, dialog);
  formValidator.enableValidation();
  return formValidator;
}

//Глобальная функция открытия диалогового окна
function openFormDialog(dialog, validator = undefined) {
  dialog.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupForEsc);
  if (validator) {
    validator.clearError();
  }
}

//*Глобальная функция закрытия диалогового окна
function closeFormDialog(dialog) {
  dialog.classList.remove('popup_opened');
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
const openViewImage = function(name, src) {
  popupViewImage.src = src;
  popupViewImage.alt = "Фотография " + name;
  popupViewDesc.textContent = name;
  openFormDialog(popupViewCard);
}

//*Функция создания карточки
function createCard(name, src) {
  const element = new Card(name, src, '#card-template', openViewImage);
  return element.generateCard();
}

//*Функция добавления карточки в список
function addCardIntoContainer(element) {
  cardsContainer.prepend(element);
}

//*Глобальные функции главного окна

//* Начальная инициализация
initialCards.reverse();
initialCards.forEach(function (item) {
  addCardIntoContainer(createCard(item.name, item.link));
});

//* Инициализация валидации
const validatorProfile = initializationValidation('.popup_edit-profile', popupProfileForm);
const validatorCard = initializationValidation('.popup_add-card', popupAddCard);

//* Обработчики закрытия по оверлею
popupProfileForm.addEventListener('mousedown', clickPopupElements);
popupAddCard.addEventListener('mousedown', clickPopupElements);
popupViewCard.addEventListener('mousedown', clickPopupElements);

//*Обработчик клика на кнопке редактирования профиля
editProfileButton.addEventListener('click', () => {
  inputNameAuthor.value = profileNameAuthor.textContent;
  inputSpecialization.value = profileSpecialization.textContent;
  openFormDialog(popupProfileForm, validatorProfile);
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
  openFormDialog(popupAddCard, validatorCard);
});

//*Обработчик добавления карточки в список (сохранение с закрытием диалоговой формы)
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCardIntoContainer(createCard(inputCardName.value, inputCardLink.value));
  closeFormDialog(popupAddCard);
});

