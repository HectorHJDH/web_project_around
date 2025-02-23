export class FormValidator {
  constructor(config, formElement, closePopup) {
    this._config = config; // Configuración con los selectores y clases de error
    this._formElement = formElement; // Elemento del formulario que se validará
    this._closePopup = closePopup;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    ); // Lista de todos los inputs dentro del formulario
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    ); // Botón de envío del formulario
  }

  /**
   * Muestra un mensaje de error asociado a un input inválido
   * @param {HTMLElement} inputElement - Campo de entrada que contiene un error
   */
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    ); // Busca el elemento de error asociado al input
    inputElement.classList.add(this._config.inputErrorClass); // Agrega clase de error al input
    errorElement.textContent = inputElement.validationMessage; // Muestra el mensaje de error nativo del input
    errorElement.style.display = "block"; // Asegura que el mensaje de error sea visible
  }

  /**
   * Oculta el mensaje de error de un input válido
   * @param {HTMLElement} inputElement - Campo de entrada cuyo error debe ocultarse
   */
  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);

    if (errorElement) {
      errorElement.textContent = ""; // Borra el mensaje de error
      errorElement.classList.remove(this._config.inputErrorClass); // Remueve la clase de error del mensaje
      errorElement.style.display = "none"; // Oculta el mensaje de error
    } else {
      console.warn(
        `No se encontró el elemento de error para el input: ${inputElement.id}`
      );
    }

    inputElement.classList.remove(this._config.inputErrorClass); // Remueve la clase de error del input
  }

  /**
   * Verifica si un input es válido y muestra u oculta el mensaje de error según corresponda
   * @param {HTMLElement} inputElement - Campo de entrada a validar
   */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement); // Muestra error si el input no es válido
    } else {
      this._hideInputError(inputElement); // Oculta el error si el input es válido
    }
  }

  /**
   * Habilita o deshabilita el botón de envío en función de la validez del formulario
   */
  _toggleButtonState() {
    const isFormValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );

    if (isFormValid) {
      this._submitButton.classList.add(this._config.activeButtonClass);
      this._submitButton.disabled = false;
      this._submitButton.removeAttribute("disabled");
    } else {
      this._submitButton.classList.remove(this._config.activeButtonClass);
      this._submitButton.disabled = true;
    }
  }

  /**
   * Agrega event listeners a los inputs para validar mientras el usuario escribe
   */
  _setEventListeners() {
    this._toggleButtonState(); // Asegura que el estado del botón sea correcto desde el inicio

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Valida el input actual
        this._toggleButtonState(); // Verifica si se debe habilitar el botón
      });
    });
  }

  /**
   * Activa la validación del formulario, previniendo el envío si hay errores
   */
  enableValidation() {
    const popup = document.querySelector(".popup");
    this._formElement.addEventListener("submit", (evt) => {
      if (!this._formElement.checkValidity()) {
        evt.preventDefault(); // Previene el envío si el formulario no es válido
        this._closePopup();
        //popup = document.querySelector(popupSelector);
        popup.classList.remove("popup__open");
        popup.style.display = "none";
      }
    });

    this._setEventListeners(); // Agrega los event listeners para la validación en tiempo real
  }
}

// evt.preventDefault(); // Previene el envío si el formulario no es válido
//         const popup = document.querySelector(".popup");
//         popup.classList.remove("popup__open");
//         popup.style.display = "none";
