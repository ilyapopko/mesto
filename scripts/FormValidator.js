export default class FormValidator {
  constructor(selectors, formElement) {
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  clearError() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputList);
  }

  enableValidation() {
    this._setEventListeners();
  }
}

