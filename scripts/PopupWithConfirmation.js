import Popup from "./Popup.js";
import { api } from "./Api.js";
import Card from "./Card.js";
// import { galleryContainer } from "./index.js";
// import { addClickEventToImage } from "./utils.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._deleteButton = document.querySelector(".deleteCard__form-submit");
  }

  open(id) {
    this._id = id;
    console.log("this._id", this._id);
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    const closeButton = document.querySelector(".deleteCard__form-submit");
    super.setEventListeners();
    console.log("this._deleteButton", closeButton);
    const deleteCardBackground = document.querySelector(
      ".deleteCard__background"
    );

    closeButton.addEventListener("click", () => {
      api.deleteCard(this._id);

      // si lo dejo crea muchas

      deleteCardBackground.style.display = "none";
    });
  }
}
