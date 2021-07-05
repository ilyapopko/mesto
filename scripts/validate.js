function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function clearValidationFields(selectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(selectors, formElement, inputElement);
  });

  if (buttonElement) {
    enableSubmitButton(buttonElement, selectors.inactiveButtonClass);
  }
}

function showInputError({inputErrorClass, errorClass}, formElement, inputElement, errorMessage) { //спасибо, действительно так понятнее, сразу как то не дошло ))
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError({inputErrorClass, errorClass}, formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(selectors, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
}

function enableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(inactiveButtonClass);
}

function disableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

function toggleButtonState(inactiveButtonClass, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
}

//В этой процедуре мы только вешаем обработчики на поля ввода и больше ничего! ибо открытых попапов нет!!!
function setEventListeners(selectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(selectors, formElement, inputElement);
      toggleButtonState(selectors.inactiveButtonClass, inputList, buttonElement);
    });
  });
}

function enableValidation(selectors) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    setEventListeners(selectors, formElement);
  });
}

