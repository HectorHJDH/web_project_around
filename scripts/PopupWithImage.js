import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  open({ link, name }) {
    if (!link || !name) {
      console.error("Datos inválidos para abrir el popup.");
      return;
    }
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }

  close() {
    this._image.src = "";
    this._image.alt = "";
    this._caption.textContent = "";
    super.close();
  }
}
