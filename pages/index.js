
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__place').textContent = item.name;
  cardsContainer.append(cardElement);
});

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const areaElements = document.querySelector('.cards');

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

  if (dialog.classList.contains('popup_opened')) {
    return;
  }

  dialog.classList.add('popup_opened');
}

function closeFormDialog(dialog) {

  if (!dialog.classList.contains('popup_opened')) {
    return;
  }

  dialog.classList.remove('popup_opened');
}


function clickPopupElements (evt) {
  const objElement = evt.target;
  if (objElement.classList.contains('popup__reset-button')) {
    closeFormDialog(objElement.parentElement.parentElement);
  } else if (objElement.classList.contains('popup')) {
    closeFormDialog(objElement);
  }
}

editProfileButton.addEventListener('click', (evt) => {
  inputNameAuthor.value = profileNameAuthor.textContent;
  inputSpecialization.value = profileSpecialization.textContent;
  openFormDialog(popupProfileForm);
});

addCardButton.addEventListener('click', (evt) => {
  inputCardName.value = '';
  inputCardLink.value = '';

  openFormDialog(popupAddForm);
});

areaElements.addEventListener("click", (evt) => {
  evt.preventDefault();
  const objElement = evt.target;

  if (objElement.classList.contains('card__likes')) {
    objElement.classList.toggle('card__likes_active');
  } else if (objElement.classList.contains('card__delete-button')) {

    const objCard = objElement.parentElement;

    let indexItem = initialCards.findIndex((item) => {
      return item.name === objElement.parentElement.children[2].children[0].textContent;
    });

    if (!(indexItem === -1)) {
      initialCards.splice(indexItem,1);
    }

    objCard.remove();

  } else if (objElement.classList.contains('card__image')) {
      const cardDesc = objElement.parentElement.querySelector('.card__place');
      popupViewImage.src = objElement.src;
      popupViewImage.alt = "Фотография " + cardDesc.textContent;
      popupViewDesc.textContent = cardDesc.textContent;

      openFormDialog(popupViewForm);
  }
});

popupProfileForm.addEventListener('click', clickPopupElements);
popupAddForm.addEventListener('click', clickPopupElements);
popupViewForm.addEventListener('click', clickPopupElements);

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objElement = evt.target;

  profileNameAuthor.textContent = inputNameAuthor.value;
  profileSpecialization.textContent = inputSpecialization.value;

  closeFormDialog(objElement.parentElement);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const objElement = evt.target;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = inputCardLink.value;
  cardElement.querySelector('.card__image').alt = "Фотография " + inputCardName.value;
  cardElement.querySelector('.card__place').textContent = inputCardName.value;
  cardsContainer.prepend(cardElement);

  closeFormDialog(objElement.parentElement);
});

