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
    console.log(this._popup);
    if (
      this._popup.classList.contains("editProfileImgPopup") ||
      this._popup.classList.contains("deleteCard__background")
    ) {
      this._popup.style.display = "flex"; // 🔥 Forzar visibilidad en caso de que display: none siga activo
      document.addEventListener("keydown", this._handleEscClose);
    } else {
      this._popup.classList.add("popup__open");
      this._popup.style.display = "flex"; // 🔥 Forzar visibilidad en caso de que display: none siga activo
      document.addEventListener("keydown", this._handleEscClose);
    }
  }

  // Método público para cerrar el popup
  close() {
    console.log("Intentando cerrar el popup...");
    console.log(
      "Estado antes de cerrar:",
      getComputedStyle(this._popup).display
    );

    this._popup.style.display = "none";
    this._popup.classList.remove("popup__open");
    this._popup.style.display = "none";

    console.log(
      "Estado después de cerrar:",
      getComputedStyle(this._popup).display
    );
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
