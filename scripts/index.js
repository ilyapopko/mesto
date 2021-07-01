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
const popupViewForm = document.querySelector('.popup_view-card');

function openFormDialog(dialog) {
  dialog.classList.add('popup_opened');
}

function closeFormDialog(dialog) {
  dialog.classList.remove('popup_opened');
}

function createCard(name, src) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const linkImage = cardElement.querySelector('.card__image');
  linkImage.src = src;
  linkImage.alt = 'Фотография ' + name;
  cardElement.querySelector('.card__place').textContent = name;

  cardElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const objElement = evt.target;
    if (objElement.classList.contains('card__likes')) {
      objElement.classList.toggle('card__likes_active');
    }
    else if (objElement.classList.contains('card__delete-button')) {
      const objCard = objElement.closest('.card');
      objCard.remove();
    }
    else if (objElement.classList.contains('card__image')) {
      const popupViewImage = document.querySelector('.popup__image');
      const popupViewDesc = document.querySelector('.popup__photo-caption');
      const objCard = objElement.closest('.card');
      const cardDesc = objCard.querySelector('.card__place');
      popupViewImage.src = objElement.src;
      popupViewImage.alt = "Фотография " + cardDesc.textContent;
      popupViewDesc.textContent = cardDesc.textContent;
      openFormDialog(popupViewForm);
    }
  });
  return cardElement;
}

function clickPopupElements (evt) {
  const objElement = evt.target;
  if (objElement.classList.contains('popup__reset-button')) {
    const objPopup = objElement.closest('.popup');
    closeFormDialog(objPopup);
  } else if (objElement.classList.contains('popup')) {
    closeFormDialog(objElement);
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

popupProfileForm.addEventListener('click', clickPopupElements);
popupAddForm.addEventListener('click', clickPopupElements);
popupViewForm.addEventListener('click', clickPopupElements);

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objElement = evt.target;

  profileNameAuthor.textContent = inputNameAuthor.value;
  profileSpecialization.textContent = inputSpecialization.value;
  const objPopup = objElement.closest('.popup');
  closeFormDialog(objPopup);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objForm = evt.target;
  const inputCardName = document.querySelector('#place-name');
  const inputCardLink = document.querySelector('#place-link');
  const cardElement = createCard(inputCardName.value, inputCardLink.value);
  cardsContainer.prepend(cardElement);
  const objPopup = objForm.closest('.popup');
  closeFormDialog(objPopup);
  objForm.reset();
});

