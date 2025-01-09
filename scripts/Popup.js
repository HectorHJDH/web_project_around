export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    if (!this._popup) {
      throw new Error(
        `Elemento con selector '${popupSelector}' no encontrado.`
      );
    }

    this._handleEscClose = this._handleEscClose.bind(this); // Asegura el contexto correcto
    this.setEventListeners();
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.add("popup__open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.remove("popup__open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Método privado para cerrar el popup al presionar Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Método público para añadir los event listeners
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      // Cierra si se hace clic en el área sombreada o en el botón de cierre
      if (
        evt.target.classList.contains("popup__overlay") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
  }
}
