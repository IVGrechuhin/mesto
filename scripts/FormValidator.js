export class FormValidator {
  constructor(classSettings, form) {
    this._classSettings = classSettings;
    this._form = form;
  }


  enableValidation() {
    this._form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    this._setEventListenersToInputs();
  }

  _setEventListenersToInputs() {
    const inputs = Array.from(this._form.querySelectorAll(this._classSettings.inputSelector));
    const buttonElement = this._form.querySelector(this._classSettings.submitButtonSelector);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs, buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputs, buttonElement) {
    if (this._hasInvalidInput(inputs)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._classSettings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._classSettings.inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._classSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classSettings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._classSettings.inputErrorClass);
    errorElement.classList.remove(this._classSettings.errorClass);
    errorElement.textContent = '';
  }

}