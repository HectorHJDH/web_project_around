import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this.selector = selector;
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

  open() {
    super.open();
  }
  // crear constante que apunte al popup
  close() {
    super.close();
    const form = document.querySelector("#createPlace__form");
    if (form) {
      document.querySelector(".createPlace__form-submit").disabled = true;
      console.log(
        "Botón deshabilitado:",
        document.querySelector(".createPlace__form-submit")
      );

      document
        .querySelector(".createPlace__form-submit")
        .classList.remove("form__button_active");
      form.reset();
    }

    const errorMessages = this._popup.querySelectorAll(".popup__error");
    errorMessages.forEach((error) => (error.textContent = ""));
  }

  setEventListeners() {
    super.setEventListeners();
    const editButtonProfile = document.querySelector(".profile__editButton");

    if (editButtonProfile) {
      editButtonProfile.removeEventListener("click", this._handleOpen);
      editButtonProfile.addEventListener("click", () => this._handleOpen());
    }

    const form = this._popup.querySelector(".popup__form");

    if (form) {
      form.removeEventListener("submit", (evt) => this._handleSubmitForm(evt));
      form.addEventListener("submit", (evt) => this._handleSubmitForm(evt));
    }
  }

  // Creamos métodos para reutilizar en removeEventListener
  _handleOpen() {
    console.log("Abriendo formulario");
    this.open();
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    try {
      console.log("Procesando formulario...");
      this._handleSubmit(this._getInputValues());
      console.log("Formulario procesado correctamente, cerrando popup...");
      this.close();
    } catch (error) {
      console.error("Error al manejar el formulario:", error);
    }
  }
}
