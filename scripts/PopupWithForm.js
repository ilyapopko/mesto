import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  _handleSubmitForm
  _form
  _inputList
  _validator

  constructor(selector, handleSubmitForm, validator) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._dialog.querySelector('.popup__container');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__edit-field'));
    this._validator = validator;
    this._validator.enableValidation();
    }

  _getInputValues() {
    const result = {};
    this._inputList.forEach(input => {
      result[input.name] = input.value;
    });

    return result;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  open(data = undefined) {
    if (data) {
      const keys = Object.keys(data);
      const dataField = this._inputList.filter( input => {
        return keys.includes(input.name);
      });
      dataField.forEach(input => {
        input.value = data[input.name];
      });
    }
    this._validator.clearErrors();
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
