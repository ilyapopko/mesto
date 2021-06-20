let editProfileButton = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let closeProfileButton = document.querySelector('.popup__reset-button');

let profileNameAuthor = document.querySelector('.profile__name');
let inputNameAuthor = document.querySelector('#author-name');

let profileSpecialization = document.querySelector('.profile__specialization');
let inputSpecialization = document.querySelector('#author-specialization');

let formProfile = document.querySelector('.popup__container');

let areaElements = document.querySelector('.elements');

function openProfileDialog() {
  if (popupElement.classList.contains('popup_opened')) {
    return;
  }

  inputNameAuthor.value = profileNameAuthor.textContent;
  inputSpecialization.value = profileSpecialization.textContent;

  popupElement.classList.add('popup_opened');
}

function closeProfileDialog() {
  if (!popupElement.classList.contains('popup_opened')) {
    return;
  }
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileNameAuthor.textContent = inputNameAuthor.value;
  profileSpecialization.textContent = inputSpecialization.value;

  closeProfileDialog();
}

function clickLikesButton (evt) {
  evt.preventDefault();
  let objElement = evt.target;
  if (!objElement.classList.contains('element__likes')) {
    return;
  }
  objElement.classList.toggle('element__likes_active');
}

editProfileButton.addEventListener('click', openProfileDialog);
closeProfileButton.addEventListener('click', closeProfileDialog);
formProfile.addEventListener('submit', formSubmitHandler);

areaElements.addEventListener("click", clickLikesButton);
