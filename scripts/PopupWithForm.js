import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      if (input.name) {
        this._formValues[input.name] = input.value;
      }
    });
    return this._formValues;
  }

  close() {
    super.close();
    const form = this._popup.querySelector(".popup__form");
    if (form) {
      form.reset();
    }

    // Limpia mensajes de error si los hubiera
    const errorMessages = this._popup.querySelectorAll(".popup__error");
    errorMessages.forEach((error) => (error.textContent = ""));
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popup.querySelector(".popup__form");

    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        try {
          this._handleSubmit(this._getInputValues());
          this.close();
        } catch (error) {
          console.error("Error al manejar el formulario:", error);
        }
      });
    }
  }
}
