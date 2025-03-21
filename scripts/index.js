import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImages from "./PopupWithImages.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import {
  handleCreatePlaceFormSubmit,
  handleProfileFormSubmit,
  validateProfileForm,
  validateCreatePlaceForm,
  handleUpdateProfileImage,
  closeModalFunction,
  addClickEventToImage,
  resetForms,
  checkEditProfileImg,
} from "./utils.js";
import { api } from "./Api.js";

/************************ API *******************************************/

const popupConfirmDelete = new PopupWithConfirmation(".deleteCard__background");

console.log(popupConfirmDelete);

// Api para obtener las cards inciales
api.getInitialCards().then((cards) => {
  //new Section(
  //  {
  //    items: cards,
  //    renderer: (item) => {
  //      const cardElement = new Card(item);
  //      const cardCreation = cardElement.getCard();
  //
  //      addClickEventToImage(cardCreation);
  //    },
  //  },
  //  ".gallery"
  //).renderItems();

  cards.forEach((card) => {
    const cardElement = new Card(
      card,
      () => popupConfirmDelete.open(card._id),
      () => popupConfirmDelete.close()
    );
    const cardCreation = cardElement.getCard();

    galleryContainer.appendChild(cardCreation);
    addClickEventToImage(cardCreation);
  });
});

// Api para obtener el usuario (nombre, about, imagen)
api.getInitialUser().then((user) => {
  const profileNameInput = document.querySelector(".profile__name");
  const profileDedicationInput = document.querySelector(".profile__dedication");
  const profilePicture = document.querySelector(".profile__picture");

  profileNameInput.textContent = user.name;
  profileDedicationInput.textContent = user.about;
  profilePicture.src = user.avatar;
});

// Api para borrar una card
// export function deleteCard(cardId) {
//   api.deleteCard(cardId).then((card) => {
//     // const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
//     // cardElement.remove();
//   });
// }

/************************ Elementos del Perfil *****************************/

// Fondo de formulario de perfil
const profileFormBackground = document.querySelector(".profile__background");

// Elemento seccion de perfil
const profileFormElement = document.querySelector(".profile__form");

// Elementos del form de perfil
const profileForm = document.forms.profileF;

// Inputs del formulario de perfil
export const profileNameInput = profileForm.elements.name;
export const profileDedicationInput = profileForm.elements.dedication;

// Id del formulario de perfil
const profileFormId = document.getElementById("profile__form");

// Boton de abrir formulario de info de perfil
const profileEditButton = document.querySelector(".profile__editButton");

// Boton de cerrar formulario del perfil
const profileCloseButton = profileFormElement.querySelector(
  ".profile__button-close"
);

/************************ Elementos foto de Perfil *************************/

// Fondo de formulario de cambiar imagen de perfil
const profileImgBackground = document.querySelector(
  ".editProfileImg__background"
);

// Elemento seccion de cambiar imagen de perfil
const profileImgFormElement = document.querySelector(
  ".editProfileImg__section"
);

// Id del formulario de cambiar imagen de perfil
const profileImgFormId = document.getElementById("editProfileImg__form");

// Boton para abrir el formulario de cambiar imagen de perfil
const profileImgEditButton = document.querySelector(".profile__picture-button");

// Boton de cerrar formulario de cambiar imagen de perfil
const closeButtonEditProfileImg = profileImgFormElement.querySelector(
  ".editProfileImg__button-close"
);

const profileImgSubmitButton = profileImgFormElement.querySelector(
  ".editProfileImg__form-submit"
);

/************************ Elementos Crear un Lugar *************************/

// Fondo de formulario de crear lugar
const createPlaceBackground = document.querySelector(
  ".createPlace__background"
);

// Elemento seccion de crear lugar
const createPlaceFormElement = document.querySelector(".createPlace__form");

// Elementos del form de crear lugar
const createPlaceForm = document.forms.createPlaceF;

// Inputs del formulario de crear lugar
export const createPlaceTitleInput = createPlaceForm.elements.placeTitle;
export const createPlaceUrlInput = createPlaceForm.elements.placeURL;

// Id del formulario de crear lugar
const createPlaceFormId = document.getElementById("createPlace__form");

// Boton de abrir formulario de crear lugar
const createPlaceButton = document.querySelector(".createPlace__button");

// Boton de cerrar formulario de crear lugar
const createPlaceCloseButton = createPlaceFormElement.querySelector(
  ".createPlace__button-close"
);

/************************ Elementos confirmar borrar card    ****************/

// Fondo de formulario de confirmar borrar
const deleteCardBackground = document.querySelector(".deleteCard__background");

const deleteCardFormElement = document.querySelector(".createPlace__form");

// deleteCard__form - submit;

/************************ Gallery *******************************************/

// Elemento section gallery
export const galleryContainer = document.querySelector(".gallery");

// Template de la gallery
const galleryCards = document.querySelectorAll(".card__area");

// Boton de borrar card
const galleryDeleteCardButton = document.querySelector(".card__delete-icon");

/************************ Cerrar Formularios ********************************/

document.addEventListener("DOMContentLoaded", () => {
  function closeAllForms() {
    profileFormBackground.style.display = "none";

    profileImgBackground.style.display = "none";

    createPlaceFormElement.style.display = "none";
    createPlaceBackground.style.display = "none";
  }

  // Cerrar con Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllForms();
    }
  });

  // Cerrar con cualquier botón de cierre
  document.querySelectorAll(".close_button").forEach((button) => {
    button.addEventListener("click", closeAllForms);
  });

  // Cerrar al hacer clic en el fondo del modal
  document.addEventListener("click", (event) => {
    if (
      event.target === profileFormBackground ||
      event.target === createPlaceBackground ||
      event.target === profileImgBackground
    ) {
      closeAllForms();
    }
  });
});

/************************ Validaciones de los Inputs de Perfil **************/

// Inputs del formulario de perfil
profileNameInput.addEventListener("input", validateProfileForm);
profileDedicationInput.addEventListener("input", validateProfileForm);

// Validacion final al enviar el formulario de perfil
profileFormElement.addEventListener("submit", (e) => {
  validateProfileForm();

  if (!profileForm.checkValidity()) {
    e.preventDefault();
  }
});

/************************ Validaciones de los Inputs de Crear Lugar *********/

createPlaceTitleInput.addEventListener("input", validateCreatePlaceForm);
createPlaceUrlInput.addEventListener("input", validateCreatePlaceForm);

// Validacion final al enviar el formulario de crear lugar
createPlaceFormElement.addEventListener("submit", (e) => {
  validateCreatePlaceForm();

  if (!createPlaceForm.checkValidity()) {
    e.preventDefault();
  }
});

/************************ Eventos de los botones *****************************/

// Muestra el formulario de crear lugar
createPlaceButton.addEventListener("click", () => {
  createPlaceFormElement.style.display = "block";
  createPlaceBackground.style.display = "flex";
  resetForms();
});

// Muestra el formulario de conmfirmación de borrar card
// galleryDeleteCardButton.addEventListener("click", () => {
//   popupConfirmDelete.open();
// });

// Evento submit crear lugar
createPlaceFormElement.addEventListener("submit", handleCreatePlaceFormSubmit);

profileImgSubmitButton.addEventListener("click", handleUpdateProfileImage);

/************************ Vista ampliada de Imagen ****************************/

const imgPreviewElement = document.querySelector(".image__view");

const imgPreviewCloseButton = document.querySelector(".image__view-button");

imgPreviewCloseButton.addEventListener("click", closeModalFunction);

imgPreviewElement.addEventListener("click", (e) => {
  if (e.target === imgPreviewElement) {
    closeModalFunction();
  }
});

/************************ Popup ************************************************/

// Ejecuta la vista del formulario de perfil
const popupWithForm = new PopupWithForm(".popup", validateProfileForm);

// Ejecuta la vista previa de la imagen
const popupWithImage = new PopupWithImages(".image__view");

// Ejecuta la vista del formulario de cambiar imagen de perfil
const popupWithFormImg = new PopupWithForm(
  ".editProfileImgPopup",
  checkEditProfileImg
);

// Ejecuta la vista del formulario de borrar card

// Actualiza la información del usuario
const userInfo = new UserInfo({
  nameSelector: "#place-title",
  titleSelector: "#place-URL",
});
// userInfo.getUserInfo();

/************************ Event Listeners *****************************************/

// formulario de perfil
popupWithForm.setEventListeners();

// vista previa de la imagen
popupWithImage.setEventListeners();

// formulario de cambiar imagen de perfil
popupWithFormImg.setEventListeners();

// formulario de borrar card
popupConfirmDelete.setEventListeners();

// Boton de abrir formulario de perfil
profileEditButton.addEventListener("click", () => {
  popupWithForm.open();
});

// Boton de abrir formulario de foto de perfil
profileImgEditButton.addEventListener("click", () => {
  popupWithFormImg.open();
});

// Boton de abrir form de borrar card
profileCloseButton.addEventListener("click", () => {
  popupWithForm.close();
});

// Boton de abrir form de borrar card
// galleryDeleteCardButton.addEventListener("click", () => {
//   popupConfirmDelete.open();
// });

profileFormElement.addEventListener(
  "submit",
  handleProfileFormSubmit(userInfo.setUserInfo)
);

/************************ Form Validator *******************************************/

const profileFormValidator = new FormValidator(
  {
    inputSelector: ".profile__form-input",
    submitButtonSelector: ".profile__form-submit",
    inputErrorClass: "form__input_type_error",
    activeButtonClass: "form__button_active",
    inactiveButtonClass: "form__button_inactive",
  },
  profileFormId,
  () => popupWithForm.close()
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
  createPlaceFormId,
  () => popupWithForm.close()
);

const changeProfileImgValidator = new FormValidator(
  {
    inputSelector: ".editProfileImg__form-input",
    submitButtonSelector: ".editProfileImg__form-submit",
    inputErrorClass: "form__input_type_error",
    activeButtonClass: "form__button_active",
    inactiveButtonClass: "form__button_inactive",
  },
  profileImgFormId,
  () => popupWithForm.close()
);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
changeProfileImgValidator.enableValidation();
