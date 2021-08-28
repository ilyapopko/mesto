//*Кнопки на главной странице для привязывания обработчиков
const editProfileButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
const addCardButton = document.querySelector('.profile__add-button');

//*Глобальный объект с описанием полей валидации
const selectors = {
  inputSelector: '.popup__edit-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__edit-field_type-error',
  errorClass: 'popup__input-error_visible'
};

export {editProfileButton, addCardButton, editAvatarButton, selectors}
