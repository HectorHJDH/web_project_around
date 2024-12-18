export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement; // El form ya está identificado, no hay que seleccionarlo de nuevo
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.style.display = "block";
  }

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`); // ✅ Genera el ID de forma dinámica

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.inputErrorClass);
      errorElement.style.display = "none";
    } else {
      console.warn(
        `No se encontró el elemento de error para el input: ${inputElement.id}`
      );
    }

    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    if (isFormValid) {
      this._submitButton.classList.add(this._config.activeButtonClass);
      this._submitButton.removeAttribute("disabled");
    } else {
      this._submitButton.classList.remove(this._config.activeButtonClass);
      this._submitButton.setAttribute("disabled", true);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      if (!this._formElement.checkValidity()) {
        evt.preventDefault();
      }
    });
    this._setEventListeners();
  }
}
