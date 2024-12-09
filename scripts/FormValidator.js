// Crea la clase FormValidator, que establece la configuración para validar los campos del
// formulario de acuerdo con los siguientes requisitos.
export class FormValidator {
  // Objeto de configuración con selectores y clases.
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // Método para mostrar mensajes de error en cada input.
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.style.display = "block";
  }

  // Método para ocultar los mensajes de error.
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  // Verifica si el input es válido y decide si mostrar o no el mensaje de error.
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Alterna el estado del botón de envío dependiendo de la validez del formulario.
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

  // Establece los controladores de eventos para los inputs y el botón.
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Método público que activa la validación del formulario.
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
