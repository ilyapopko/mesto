const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

initialCards.forEach(function (item) {
  const cardElement = createCard(item.name, item.link);
  cardsContainer.append(cardElement);
});

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupProfileForm = document.querySelector('.popup_edit-profile');
const formProfile = document.querySelector('#formEditProfile');
const profileNameAuthor = document.querySelector('.profile__name');
const inputNameAuthor = document.querySelector('#author-name');
const profileSpecialization = document.querySelector('.profile__specialization');
const inputSpecialization = document.querySelector('#author-specialization');
const popupAddForm = document.querySelector('.popup_add-card');
const formAddCard = document.querySelector('#formAddCard');
const inputCardName = document.querySelector('#place-name');
const inputCardLink = document.querySelector('#place-link');
const popupViewForm = document.querySelector('.popup_view-card');
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
  //dialog.addEventListener('keydown', closePopupForEsc, true);
  allContext.addEventListener('keydown', closePopupForEsc);
}

function closeFormDialog(dialog) {
  dialog.classList.remove('popup_opened');
  dialog.removeEventListener('mousedown', clickPopupElements);
  //dialog.removeEventListener('keydown', closePopupForEsc, true);
  allContext.removeEventListener('keydown', closePopupForEsc);
}

function openViewImage(name, src) {
  popupViewImage.src = src;
  popupViewImage.alt = "Фотография " + name;
  popupViewDesc.textContent = name;
  openFormDialog(popupViewForm);
}

function deleteCard(evt) {
  const objCard = evt.target.closest('.card');
  objCard.remove();
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
  const objElement = evt.target;
  if (objElement === evt.currentTarget || objElement.classList.contains('popup__reset-button')) {
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

  ValidateForm(selectors, formProfile);

  openFormDialog(popupProfileForm);
});

addCardButton.addEventListener('click', () => {
  formAddCard.reset();

  ValidateForm(selectors, formAddCard);

  openFormDialog(popupAddForm);
});

// popupProfileForm.addEventListener('mousedown', clickPopupElements);
// popupAddForm.addEventListener('mousedown', clickPopupElements);
// popupViewForm.addEventListener('mousedown', clickPopupElements);

// inputNameAuthor.addEventListener('keydown', closePopupForEsc);
// inputSpecialization.addEventListener('keydown', closePopupForEsc);
// inputCardName.addEventListener('keydown', closePopupForEsc);
// inputCardLink.addEventListener('keydown', closePopupForEsc);

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileNameAuthor.textContent = inputNameAuthor.value;
  profileSpecialization.textContent = inputSpecialization.value;
  closeFormDialog(popupProfileForm);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objForm = evt.target;
  const cardElement = createCard(inputCardName.value, inputCardLink.value);
  cardsContainer.prepend(cardElement);
  closeFormDialog(popupAddForm);
  objForm.reset();
});

enableValidation(selectors);

