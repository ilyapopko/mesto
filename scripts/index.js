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

function openFormDialog(dialog) {
  dialog.classList.add('popup_opened');
}

function closeFormDialog(dialog) {
  dialog.classList.remove('popup_opened');
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

editProfileButton.addEventListener('click', () => {
  inputNameAuthor.value = profileNameAuthor.textContent;
  inputSpecialization.value = profileSpecialization.textContent;
  openFormDialog(popupProfileForm);
});

addCardButton.addEventListener('click', () => {
  formAddCard.reset();
  openFormDialog(popupAddForm);
});

popupProfileForm.addEventListener('mousedown', clickPopupElements);
popupAddForm.addEventListener('mousedown', clickPopupElements);
popupViewForm.addEventListener('mousedown', clickPopupElements);

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

