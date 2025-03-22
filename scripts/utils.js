import Card from "./Card.js";
import { api } from "./Api.js";
import {
  profileNameInput,
  profileDedicationInput,
  createPlaceTitleInput,
  createPlaceUrlInput,
} from "./index.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

/************************ Elementos del Perfil *****************************/

const profileFormBackground = document.querySelector(".profile__background");

// Elemento seccion de perfil
const profileFormElement = document.querySelector(".profile__form");

// Botón de envío del formulario de perfil
const profileSubmitButton = profileFormElement.querySelector(
  ".profile__form-submit"
);

// Input de dedication de perfil
const profileInputElement = document.getElementById("dedication");

/************************ Vista previa cards ********************************/

// Contenedor de vista previa de imagen
const imgPreviewElement = document.querySelector(".image__view");

// Elemento imagen
const previewImg = document.querySelector(".image__view-img");

// Elemento título de la imagen
const previewTitle = document.querySelector(".image__view-title");

/************************ Input Errors ***************************************/

// Elemento de error de nombre de perfil
const profileNameError = document.getElementById("profile-name-error");

// Elemento de error de dedicacion
const profileDedicationError = document.getElementById(
  "profile-dedication-error"
);

/************************ Elementos de Imagen de Perfil ***********************/

// Formulario de editar imagen de perfil
const editProfileImgForm = document.querySelector(
  ".editProfileImg__section form"
);

// Botón de envío del formulario de editar imagen de perfil
const editProfileImgSubmitButton = document.querySelector(
  ".editProfileImg__form-submit"
);

const editProfileImageArea = document.querySelector(".editProfileImgPopup");

// Input de URL de imagen de perfil
const editProfileImgURLInput = editProfileImgForm.elements.editProfileImgURL;

/************************ Elementos de crear lugar ****************************/

// Formulario de crear lugar
const createPlaceFormElement = document.querySelector(".createPlace__form");

// Botón de envío del formulario de crear lugar
const createPlaceSubmitButton = createPlaceFormElement.querySelector(
  ".createPlace__form-submit"
);

// Fondo del formulario de crear lugar
const createPlaceBackground = document.querySelector(
  ".createPlace__background"
);

/************************ Gallery de Imagenes *********************************/

const galleryContainer = document.querySelector(".gallery");

/************************ Tarjetas Iniciales **********************************/

export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

/************************ Formulario Perfil ***********************************/

// Formulario de editar datos de perfil
export const handleProfileFormSubmit = (setUserInfo) => (event) => {
  event.preventDefault();
  setUserInfo({
    name: profileNameInput.value,
    title: profileDedicationInput.value,
  });
};

// Asignación del evento de validación al formulario de perfil
profileInputElement.addEventListener("input", validateProfileForm);

/************************ Validaciones de los Inputs de Perfil **************/

export function validateProfileForm(event) {
  const inputElement = event?.target;

  if (!inputElement || !inputElement.id) {
    return;
  }

  // Selecciona dinámicamente el mensaje de error
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  if (errorElement) {
    if (inputElement.value.trim().length === 0) {
      errorElement.textContent = ""; // Limpia el mensaje si el campo está vacío
      errorElement.style.display = "none";
    } else if (!inputElement.validity.valid) {
      errorElement.textContent = "El campo no es válido";
      errorElement.style.display = "block";
    } else {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  // Validar todo el formulario para habilitar/deshabilitar el botón
  const nameVal = profileNameInput.value.trim();
  const dedicationVal = profileDedicationInput.value.trim();
  const isNameValid = nameVal.length >= 2 && nameVal.length <= 40;
  const isDedicationValid =
    dedicationVal.length >= 2 && dedicationVal.length <= 200;

  if (isNameValid && isDedicationValid) {
    profileSubmitButton.classList.add("enabled");
    profileSubmitButton.removeAttribute("disabled");
  } else {
    profileSubmitButton.classList.remove("enabled");
    profileSubmitButton.setAttribute("disabled", true);
  }
}

/************************ Formulario cambiar imagen perfil ***********************/

// Submit del formulario de cambiar imagen
// export function handleUpdateProfileImage(evt) {
//   evt.preventDefault();
//   console.log("handleUpdateProfileImage");

//   const imgURL = editProfileImgURLInput.value;
//   const actualImg = document.querySelector(".profile__picture");

//   if (imgURL) {
//     api.editProfileImage({ avatar: imgURL });
//     actualImg.src = imgURL;
//     editProfileImgForm.reset();
//     editProfileImageArea.style.display = "none";
//   }
// }
export function handleUpdateProfileImage(evt) {
  evt.preventDefault();
  console.log("handleUpdateProfileImage");

  const imgURL = editProfileImgURLInput.value.trim();
  const actualImg = document.querySelector(".profile__picture");

  // Expresión regular para validar URLs
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?=&%:.~\w\-]*)?$/i;

  if (!urlPattern.test(imgURL)) {
    alert("Por favor, ingresa una URL válida de imagen.");
    return;
  }

  api
    .editProfileImage({ avatar: imgURL })
    .then(() => {
      actualImg.src = imgURL;
      editProfileImgForm.reset();
      editProfileImageArea.style.display = "none";
    })
    .catch((error) => {
      console.error("Error al actualizar la imagen:", error);
    });
}

/************************ Formulario crear lugar **********************************/
const popupConfirmDelete = new PopupWithConfirmation(".deleteCard__background");

// Formulario de crear un lugar
export function handleCreatePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeTitle = createPlaceTitleInput.value;
  const placeImageUrl = createPlaceUrlInput.value;

  console.log("placeTitle", placeTitle);
  console.log("placeImageUrl", placeImageUrl);

  if (placeTitle && placeImageUrl) {
    console.log("Creating new card...");
    api.createCard({ name: placeTitle, link: placeImageUrl }).then((res) => {
      console.log("res", res);
      createCards(res);
    });
    resetForms();
  }
}

/************************ Validaciones de los Inputs de Create Place **************/

export function validateCreatePlaceForm(event) {
  const inputElement = event?.target;

  if (!inputElement || !inputElement.id) {
    return;
  }

  // Selecciona el contenedor de error dinámicamente
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  if (errorElement) {
    if (inputElement.validity.valid) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    } else {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.style.display = "block";
    }
  }

  // Validar todo el formulario y habilitar/deshabilitar el botón de envío
  const titleVal = createPlaceTitleInput.value.trim();
  const URLVal = createPlaceUrlInput.value.trim();
  const isTitleValid = titleVal.length >= 2 && titleVal.length <= 30;
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?=&%:.~\w\-]*)?$/i;
  const isUrlValid = urlPattern.test(URLVal);

  if (isTitleValid && isUrlValid) {
    createPlaceSubmitButton.classList.add("enabled");
    createPlaceSubmitButton.removeAttribute("disabled");
  } else {
    createPlaceSubmitButton.classList.remove("enabled");
    createPlaceSubmitButton.setAttribute("disabled", true);
  }
}

/************************ Validaciones de la URL de la Imagen de Perfil **************/
export function checkEditProfileImg() {
  // e.preventDefault();
  // console.log("event", e.preventDefault());
  // const URLVal = editProfileImgURLInput.value.trim();
  // const urlPattern =
  //   /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?=&%:.~\w\-]*)?$/i;
  // const isUrlValid = urlPattern.test(URLVal);
  // if (isUrlValid) {
  //   editProfileImgSubmitButton.classList.add("enabled");
  //   editProfileImgSubmitButton.removeAttribute("disabled");
  // } else {
  //   editProfileImgSubmitButton.classList.remove("enabled");
  //   editProfileImgSubmitButton.setAttribute("disabled", true);
  // }
}

/************************ Resetear los formularios ***********************************/
//
export function resetForms() {
  profileNameInput.value = "";
  profileDedicationInput.value = "";
  profileSubmitButton.setAttribute("disabled", true);
  profileSubmitButton.classList.remove("enabled");

  createPlaceTitleInput.value = "";
  createPlaceUrlInput.value = "";
  createPlaceSubmitButton.setAttribute("disabled", true);
  createPlaceSubmitButton.classList.remove("enabled");
}

/************************ Vista ampliada de Imagen ****************************/

// Abrir imagen ampliada
export function openModal(imageSrc, imageTitle) {
  previewImg.src = imageSrc;
  previewTitle.textContent = imageTitle;
  imgPreviewElement.style.display = "flex";
}

// Cerrar imagen ampliada
export function closeModalFunction() {
  imgPreviewElement.style.display = "none";
}

// Evento para agrandar la imagen
export function addClickEventToImage(cardElement) {
  const image = cardElement.querySelector(".card__image");
  const text = cardElement.querySelector(".card__title");
  if (image) {
    image.addEventListener("click", () => {
      const imageTitle = text.textContent;
      openModal(image.src, imageTitle);
    });
  }
}

/************************ Crear una card **************************************/

export function createCards(card) {
  console.log("card...", card);

  const cardElement = new Card(
    card,
    () => popupConfirmDelete.open(card._id),
    () => popupConfirmDelete.close()
  );
  const cardCreation = cardElement.getCard();

  if (cardCreation) {
    console.log("cardCreation...", cardCreation);
    galleryContainer.prepend(cardCreation);
    addClickEventToImage(cardCreation);
  }

  // // creating main card container -
  // const galleryBox = document.createElement("div");
  // galleryBox.classList.add("card__area");

  // // creating delete button - ya en card
  // const galleryDeleteButton = document.createElement("button");
  // galleryDeleteButton.classList.add("card__delete-icon");

  // // creating gallery image icon - ya en card
  // const galleryImage = document.createElement("img");
  // galleryImage.classList.add("card__image");
  // galleryImage.src = card.link;
  // galleryImage.alt = card.name;

  // // creating gallery container div - ya en card
  // const createGalleryDiv = document.createElement("div");
  // createGalleryDiv.classList.add("card__menu");

  // // adding title to gallery container div - ya en card
  // const galleryTitle = document.createElement("h3");
  // galleryTitle.classList.add("card__title");
  // galleryTitle.textContent = card.name;

  // // creating like button - ya en card
  // const likeButton = document.createElement("button");
  // likeButton.classList.add("card__like");

  // likeButton.addEventListener("click", function () {
  //   likeButton.classList.toggle("card__like_active");
  // });

  // createGalleryDiv.appendChild(galleryTitle);
  // createGalleryDiv.appendChild(likeButton);
  // galleryBox.appendChild(galleryDeleteButton);
  // galleryBox.appendChild(galleryImage);
  // galleryBox.appendChild(createGalleryDiv);

  // galleryDeleteButton.addEventListener("click", () => {
  //   galleryBox.remove();
  // });

  // return galleryBox;
}

createPlaceSubmitButton.addEventListener("click", () => {
  // Verificamos si el formulario es válido antes de cerrarlo
  if (createPlaceFormElement) {
    createPlaceFormElement.style.display = "none";
    createPlaceBackground.style.display = "none";
  }
});

profileSubmitButton.addEventListener("click", () => {
  // Verificamos si el formulario es válido antes de cerrarlo
  if (profileFormElement) {
    // profileFormElement.style.display = "none";
    profileFormBackground.style.display = "none";
    api.editProfileCredentials({
      name: profileNameInput.value,
      about: profileDedicationInput.value,
    });
  }
});
