//*Кнопки на главной странице для привязывания обработчиков
const editProfileButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
const addCardButton = document.querySelector('.profile__add-button');
const bugButton = document.querySelector('.header__bug-button');

const editButton = document.querySelector('.card__edit-button');
const goSourceButton = document.querySelector('.card__go-source-button');


//*Глобальный объект с описанием полей валидации
const selectors = {
  inputSelector: '.popup__edit-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__edit-field_type-error',
  errorClass: 'popup__input-error_visible'
};

export {editProfileButton, addCardButton, editAvatarButton, bugButton, editButton, goSourceButton, selectors}
