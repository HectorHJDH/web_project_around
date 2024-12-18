import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  handleCreatePlaceFormSubmit,
  handleProfileFormSubmit,
  validateProfileName,
  validateProfileDedication,
  validateCreatePlaceTitle,
  validateCreatePlaceURL,
  checkFormInputsProfile,
  checkFormInputsPlace,
  closeModalFunction,
  addClickEventToImage,
  resetForms,
  initialCards,
} from "./utils.js";

// profile__form variables
const profileFormBackground = document.querySelector(".profile__background");
const profileFormElement = document.querySelector(".profile__form");

const profileFormElementId = document.getElementById("profile__form");
const createPlaceFormElementId = document.getElementById("createPlace__form");

const closeButtonProfile = profileFormElement.querySelector(
  ".profile__button-close"
);
const editButtonProfile = document.querySelector(".profile__editButton");

const profileForm = document.forms.profileF;
const profileName = profileForm.elements.name;
const profileDedication = profileForm.elements.dedication;

// createPlace__form variables
const createPlaceFormBackground = document.querySelector(
  ".createPlace__background"
);
const createPlaceFormElement = document.querySelector(".createPlace__form");
const closeButtonCreatePlace = createPlaceFormElement.querySelector(
  ".createPlace__button-close"
);

const createPlaceButton = document.querySelector(".createPlace__button");
const createPlaceId = document.querySelector("#createPlace__form");

const createPlaceForm = document.forms.createPlaceF;
const placeTitleInput = createPlaceForm.elements.placeTitle;
const placeUTLInput = createPlaceForm.elements.placeURL;

const galleryContainer = document.querySelector(".gallery");

// Cerrar los formularios con la tecla "Escape"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    profileFormElement.style.display = "none";
    profileFormBackground.style.display = "none";
    createPlaceFormElement.style.display = "none";
    createPlaceFormBackground.style.display = "none";
  }
});

// Eventos para validar los inputs del formulario de perfil en tiempo real
profileName.addEventListener("input", validateProfileName);
profileDedication.addEventListener("input", validateProfileDedication);

// Eventos para validar los inputs del formulario de crear lugar en tiempo real
placeTitleInput.addEventListener("input", validateCreatePlaceTitle);
placeUTLInput.addEventListener("input", validateCreatePlaceURL);

// Validacion final al enviar el formulario de perfil
profileFormElement.addEventListener("submit", (e) => {
  validateProfileName();
  validateProfileDedication();

  if (!profileForm.checkValidity()) {
    e.preventDefault();
  }
});

// Validacion final al enviar el formulario de crear lugar
createPlaceFormElement.addEventListener("submit", (e) => {
  validateCreatePlaceTitle();
  validateCreatePlaceURL();

  if (!createPlaceForm.checkValidity()) {
    e.preventDefault();
  }
});

// Eventos profile
profileName.addEventListener("input", checkFormInputsProfile);
profileDedication.addEventListener("input", checkFormInputsProfile);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

editButtonProfile.addEventListener("click", () => {
  profileFormElement.style.display = "block";
  profileFormBackground.style.display = "flex";
  resetForms();
});

closeButtonProfile.addEventListener("click", () => {
  profileFormElement.style.display = "none";
  profileFormBackground.style.display = "none";
});

profileFormBackground.addEventListener("click", (event) => {
  if (event.target === profileFormBackground) {
    profileFormBackground.style.display = "none";
  }
});

// Eventos createPlace
placeTitleInput.addEventListener("input", checkFormInputsPlace);
placeUTLInput.addEventListener("input", checkFormInputsPlace);
createPlaceFormElement.addEventListener("submit", handleCreatePlaceFormSubmit);

createPlaceButton.addEventListener("click", () => {
  createPlaceFormElement.style.display = "block";
  createPlaceFormBackground.style.display = "flex";
  resetForms();
});

closeButtonCreatePlace.addEventListener("click", () => {
  createPlaceFormElement.style.display = "none";
  createPlaceFormBackground.style.display = "none";
});

createPlaceFormBackground.addEventListener("click", (event) => {
  if (event.target === createPlaceFormBackground) {
    createPlaceFormBackground.style.display = "none";
  }
});

// Click en una imagen
const imgPreviewElement = document.querySelector(".image__view");
const previewImg = document.querySelector(".image__view-img");

const closePreview = document.querySelector(".image__viewButton");
const previewTitle = document.querySelector(".image__view-title");

closePreview.addEventListener("click", closeModalFunction);

imgPreviewElement.addEventListener("click", (e) => {
  if (e.target === imgPreviewElement) {
    closeModalFunction();
  }
});

const galleryCards = document.querySelectorAll(".card__area");
// galleryCards.forEach(addClickEventToImage);

initialCards.forEach((card) => {
  const cardElement = new Card(card);
  const cardCreation = cardElement.getCard();

  galleryContainer.appendChild(cardCreation);
  addClickEventToImage(cardCreation);
  // return cardCreation;
});

// Validación del formulario de perfil
const profileFormValidator = new FormValidator(
  {
    inputSelector: ".profile__form-input",
    submitButtonSelector: ".profile__form-submit",
    inputErrorClass: "form__input_type_error",
    activeButtonClass: "form__button_active",
    inactiveButtonClass: "form__button_inactive",
  },
  profileFormElementId
);

// Validación del formulario de crear lugar
const cardFormValidator = new FormValidator(
  {
    inputSelector: ".createPlace__form-input",
    submitButtonSelector: ".createPlace__form-submit",
    inputErrorClass: "form__input_type_error",
    activeButtonClass: "form__button_active",
    inactiveButtonClass: "form__button_inactive",
  },
  createPlaceFormElementId
);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
