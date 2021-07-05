function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function showInputError(selectors, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

function hideInputError(selectors, formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectors.errorClass);
}

function checkInputValidity(selectors, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
}

function toggleButtonState(selectors, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
}

//В этой процедуре проходит единоразовая проверка полей, она нужна при открытии попапа для первой проверки и установки статуса кнопки субмита
function ValidateForm(selectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    checkInputValidity(selectors, formElement, inputElement);
  });
  toggleButtonState(selectors, inputList, buttonElement);
}

//В этой процедуре мы только вешаем обработчики на поля ввода и больше ничего! ибо открытых попапов нет!!!
function setEventListeners(selectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(selectors, formElement, inputElement);
      toggleButtonState(selectors, inputList, buttonElement);
    });
  });
}

function enableValidation(selectors) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    setEventListeners(selectors, formElement);
  });
}

