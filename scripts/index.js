const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileForm = document.querySelector('.popup_edit-profile');
const formProfile = document.querySelector('#formEditProfile');
const profileNameAuthor = document.querySelector('.profile__name');
const inputNameAuthor = document.querySelector('#author-name');
const profileSpecialization = document.querySelector('.profile__specialization');
const inputSpecialization = document.querySelector('#author-specialization');

const popupAddCard = document.querySelector('.popup_add-card');

const formAddCard = document.querySelector('#formAddCard');
const inputCardName = document.querySelector('#place-name');
const inputCardLink = document.querySelector('#place-link');
const popupViewCard = document.querySelector('.popup_view-card');
const popupViewImage = document.querySelector('.popup__image');
const popupViewDesc = document.querySelector('.popup__photo-caption');

const allContext = document.querySelector('.content');  //только этот элемент отрабатывает нажатие keydown всегда, а не только при фокусе в inpute


const selectors = {
  // formSelector: '.popup__form',
  inputSelector: '.popup__edit-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__edit-field_type-error',
  errorClass: 'popup__input-error_visible'
};


function openFormDialog(dialog) {
  dialog.classList.add('popup_opened');
  dialog.addEventListener('mousedown', clickPopupElements);
  //dialog.addEventListener('keydown', closePopupForEsc, true); //а жаль, халява была так желанна )))
  allContext.addEventListener('keydown', closePopupForEsc);
}

function closeFormDialog(dialog) {
  dialog.classList.remove('popup_opened');
  // очистка полей валидации при закрытии с отменой редактирования
  clearValidationFields(selectors, dialog);
  dialog.removeEventListener('mousedown', clickPopupElements);
  //dialog.removeEventListener('keydown', closePopupForEsc, true);
  allContext.removeEventListener('keydown', closePopupForEsc);
}

function openViewImage(name, src) {
  popupViewImage.src = src;
  popupViewImage.alt = "Фотография " + name;
  popupViewDesc.textContent = name;
  openFormDialog(popupViewCard);
}

function deleteCard(evt) {
  const element = evt.target.closest('.card');
  element.remove();
}

function toggleFlagLike(evt) {
  evt.target.classList.toggle('card__likes_active');
}

function createCard(name, src) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const linkImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__likes');
  const placeCaption = cardElement.querySelector('.card__place');
  linkImage.src = src;
  linkImage.alt = 'Фотография ' + name;
  placeCaption.textContent = name;
  linkImage.addEventListener('click', () => openViewImage(name, src));
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', toggleFlagLike);
  return cardElement;
}

function clickPopupElements (evt) {
  const element = evt.target;
  if (element === evt.currentTarget || element.classList.contains('popup__reset-button')) {
    closeFormDialog(evt.currentTarget);
  }
}

function closePopupForEsc (evt) {
  if (evt.key === 'Escape') {
    //проверим есть ли открытая форма
    const openForm = document.querySelector('.popup_opened');
    if (openForm) {
      closeFormDialog(openForm);
    }
    // closeFormDialog(evt.target.closest('.popup'));
  }
}

editProfileButton.addEventListener('click', () => {
  inputNameAuthor.value = profileNameAuthor.textContent;
  inputSpecialization.value = profileSpecialization.textContent;
  openFormDialog(popupProfileForm);
});

addCardButton.addEventListener('click', () => {
  formAddCard.reset();
  const buttonElement = formAddCard.querySelector(selectors.submitButtonSelector);
  disableSubmitButton(buttonElement, selectors.inactiveButtonClass);
  openFormDialog(popupAddCard);
});

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileNameAuthor.textContent = inputNameAuthor.value;
  profileSpecialization.textContent = inputSpecialization.value;
  closeFormDialog(popupProfileForm);


});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const element = createCard(inputCardName.value, inputCardLink.value);
  cardsContainer.prepend(element);
  closeFormDialog(popupAddCard);

  
  //form.reset(); //это было условием 5 работы
});

//этот код был вверху чтобы не мешаться "по ногами" - ибо его все равно удалять через несколько итераций
initialCards.forEach(function (item) {
  const element = createCard(item.name, item.link);
  cardsContainer.append(element);
});

enableValidation(selectors);


