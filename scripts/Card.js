// import { deleteCard } from "./index.js";
import { api } from "./Api.js";
import { galleryContainer } from "./index.js";

export default class Card {
  constructor(card, handleConfirmDelete, handleClosePopup) {
    this._card = card;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleClosePopup = handleClosePopup;
    // this._apiDeleteCard = apiDeleteCard;
  }

  // Obtener template de la card
  _getTemplate() {
    const cardTemplate = document.querySelector("#card__area").content;
    return cardTemplate.querySelector(".card").cloneNode(true);
  }

  // Propiedades de la card
  _setProperties() {
    this.htmlCard = this._getTemplate();
    this.cardImage = this.htmlCard.querySelector(".card__image");
    this.cardTitle = this.htmlCard.querySelector(".card__title");
    this.cardLike = this.htmlCard.querySelector(".card__like");
    this.deleteButton = this.htmlCard.querySelector(".card__delete-icon");
    this.cardTitle.textContent = this._card.name;
    this.cardImage.src = this._card.link;
    if (this._card.isLiked) {
      this.cardLike.classList.add("card__like_active");
    }
  }

  getCard() {
    this._setProperties();
    this.setEventListeners();
    return this.htmlCard;
  }

  // Crear contenedor de cards
  createCardContainer() {
    this.cardContainer = document.createElement("div");
    this.cardContainer.classList.add("card__area");
    return this.cardContainer;
  }

  // Borrar una card
  deleteButton() {
    this.deleteButton = document.createElement("button");
    this.deleteButton.classList.add("card__delete-icon");
    this.deleteButton.src = "/images/Trash.svg";
    this.deleteButton.alt = "Delete button";
  }

  // Crear imagen en la card
  createGalleryImage() {
    this.galleryImage = document.createElement("img");
    this.galleryImage.classList.add("card__image");
    this.galleryImage.src = this._link;
    this.galleryImage.alt = this._name;
  }

  // Crear contenedor de la galería
  createGalleryContainer() {
    this.galleryContainer = document.createElement("div");
    this.galleryContainer.classList.add("card__menu");
  }

  // Crear título de la card
  createGalleryTitle() {
    this.galleryTitle = document.createElement("h3");
    this.galleryTitle.classList.add("card__title");
    this.galleryTitle.textContent = this._name;
  }

  // Crear botón de like
  createGalleryLike() {
    this.cardLike.classList.toggle("card__like_active");
    if (this._card.isLiked) {
      api.removeLikeCard(this._card._id);
    } else {
      api.likeCard(this._card._id);
    }
    console.log(this._card);
  }

  // Eventos de like y eliminar
  setEventListeners() {
    this.cardLike.addEventListener("click", () => {
      this.createGalleryLike();
    });

    const closeButton = document.querySelector(".deleteCard__button-close");
    closeButton.addEventListener("click", () => {
      this._handleClosePopup();
    });

    this.deleteButton.addEventListener("click", () => {
      this._handleConfirmDelete();

      // this.htmlCard.remove();
      // deleteCard(this._card._id);
    });

    const confirmDeleteButton = document.querySelector(
      ".deleteCard__form-submit"
    );

    confirmDeleteButton.addEventListener("click", () => {
      console.log("confirm Delete button clicked");

      this.htmlCard.remove();

      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }
}
