function enableValidation(classSettings) {
  const forms = Array.from(document.querySelectorAll(classSettings.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    setEventListenersToInputs(formElement, classSettings);
  });
}

function setEventListenersToInputs(formElement, classSettings) {
  const inputs = Array.from(formElement.querySelectorAll(classSettings.inputSelector));
  const buttonElement = formElement.querySelector(classSettings.submitButtonSelector);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, classSettings);
      toggleButtonState(inputs, buttonElement, classSettings);
    });
  });
}

function checkInputValidity(formElement, inputElement, classSettings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classSettings);
  } else {
    hideInputError(formElement, inputElement, classSettings);
  }
}

function toggleButtonState(inputs, buttonElement, classSettings) {
  if (hasInvalidInput(inputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(classSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(classSettings.inactiveButtonClass);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function showInputError(formElement, inputElement, errorMessage, classSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classSettings.errorClass);
}

function hideInputError(formElement, inputElement, classSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classSettings.inputErrorClass);
  errorElement.classList.remove(classSettings.errorClass);
  errorElement.textContent = '';
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_visible',
});