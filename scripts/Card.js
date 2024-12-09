export default class Card {
  constructor(card) {
    this._card = card;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector("#card__area").content;
    return cardTemplate.querySelector(".card").cloneNode(true);
  }

  _setProperties() {
    this.htmlCard = this._getTemplate();
    this.cardImage = this.htmlCard.querySelector(".card__image");
    this.cardTitle = this.htmlCard.querySelector(".card__title");
    this.cardLike = this.htmlCard.querySelector(".card__like");
    this.deleteButton = this.htmlCard.querySelector(".card__delete-icon");
    this.cardTitle.textContent = this._card.name;
    this.cardImage.src = this._card.link;
  }

  // metodos
  getCard() {
    this._setProperties();
    this.setEventListeners();
    return this.htmlCard;
  }

  createCardContainer() {
    this.cardContainer = document.createElement("div");
    this.cardContainer.classList.add("card__area");
    return this.cardContainer;
  }

  deleteButton() {
    this.deleteButton = document.createElement("button");
    this.deleteButton.classList.add("card__delete-icon");
    this.deleteButton.src = "/images/Trash.svg";
    this.deleteButton.alt = "Delete button";
  }

  createGalleryImage() {
    this.galleryImage = document.createElement("img");
    this.galleryImage.classList.add("card__image");
    this.galleryImage.src = this._link;
    this.galleryImage.alt = this._name;
  }

  createGalleryContainer() {
    this.galleryContainer = document.createElement("div");
    this.galleryContainer.classList.add("card__menu");
  }

  createGalleryTitle() {
    this.galleryTitle = document.createElement("h3");
    this.galleryTitle.classList.add("card__title");
    this.galleryTitle.textContent = this._name;
  }

  createGalleryLike() {
    this.cardLike.classList.toggle("card__like_active");
  }

  setEventListeners() {
    this.cardLike.addEventListener("click", () => {
      this.createGalleryLike();
    });

    this.deleteButton.addEventListener("click", () => {
      this.htmlCard.remove();
    });
  }
}
