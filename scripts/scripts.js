// profile__form variables
const profileFormBackground = document.querySelector(".profile__background");
const profileFormElement = document.querySelector(".profile__form");
const closeButtonProfile = profileFormElement.querySelector(
  ".profile__button-close"
);
const editButtonProfile = document.querySelector(".profile__editButton");
const submitButtonProfile = profileFormElement.querySelector(
  ".profile__form-submit"
);
const nameValueProfile = document.querySelector(".profile__name");
const dedicationValueProfile = document.querySelector(".profile__dedication");

const profileForm = document.forms.profileF;
const profileName = profileForm.elements.name;
const profileDedication = profileForm.elements.dedication;

const profileNameError = document.getElementById("profile-name-error");
const profileDedicationError = document.getElementById(
  "profile-dedication-error"
);

// createPlace__form variables
const createPlaceFormBackground = document.querySelector(
  ".createPlace__background"
);
const createPlaceFormElement = document.querySelector(".createPlace__form");
const closeButtonCreatePlace = createPlaceFormElement.querySelector(
  ".createPlace__button-close"
);
const submitButtonCreatePlace = createPlaceFormElement.querySelector(
  ".createPlace__form-submit"
);
const createPlaceButton = document.querySelector(".createPlace__button");

const createPlaceForm = document.forms.createPlaceF;
const placeTitleInput = createPlaceForm.elements.placeTitle;
const placeUTLInput = createPlaceForm.elements.placeURL;

const placeTitleError = document.getElementById("createPlace-title-error");
const placeURLError = document.getElementById("createPlace-url-error");

// Formulario de modificar datos del perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameValueProfile.textContent = profileName.value;
  dedicationValueProfile.textContent = profileDedication.value;

  profileFormElement.style.display = "none";
  profileFormBackground.style.display = "none";
}

// Formulario de crear un lugar
function handleCreatePlaceFormSubmit(evt) {
  evt.preventDefault();

  const placeTitle = placeTitleInput.value;
  const placeImageUrl = placeUTLInput.value;

  if (placeTitle && placeImageUrl) {
    const newCard = createCard({ name: placeTitle, link: placeImageUrl });
    galleryContainer.appendChild(newCard);
    addClickEventToImage(newCard);

    createPlaceFormElement.style.display = "none";
    createPlaceFormBackground.style.display = "none";
    resetForms();
  }
}

// Cerrar los formularios con la tecla "Escape"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    profileFormElement.style.display = "none";
    profileFormBackground.style.display = "none";
    createPlaceFormElement.style.display = "none";
    createPlaceFormBackground.style.display = "none";
  }
});

// Validacion input de nombre de autor
function validateProfileName() {
  if (!profileName.validity.valid) {
    profileNameError.textContent = profileName.validationMessage;
    profileNameError.style.display = "block";
  } else {
    profileNameError.textContent = "";
    profileNameError.style.display = "none";
  }

  submitButtonProfile.disabled = !profileFormElement.checkValidity();
}

// Validacion input de dedication
function validateProfileDedication() {
  if (!profileDedication.validity.valid) {
    profileDedicationError.textContent = profileDedication.validationMessage;
    profileDedicationError.style.display = "block";
  } else {
    profileDedicationError.textContent = "";
    profileDedicationError.style.display = "none";
  }

  submitButtonProfile.disabled = !profileFormElement.checkValidity();
}

// Validacion input de titulo del lugar a crear
function validateCreatePlaceTitle() {
  if (!placeTitleInput.validity.valid) {
    placeTitleError.textContent = placeTitleInput.validationMessage;
    placeTitleError.style.display = "block";
  } else {
    placeTitleError.textContent = "";
    placeTitleError.style.display = "none";
  }

  submitButtonCreatePlace.disabled = !createPlaceFormElement.checkValidity();
}

// Validacion input de URL
function validateCreatePlaceURL() {
  if (!placeUTLInput.validity.valid) {
    placeURLError.textContent = placeUTLInput.validationMessage;
    placeURLError.style.display = "block";
  } else {
    placeURLError.textContent = "";
    placeURLError.style.display = "none";
  }

  submitButtonCreatePlace.disabled = !createPlaceFormElement.checkValidity();
}

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

  if (!profileFormElement.checkValidity()) {
    e.preventDefault();
  }
});

// Validacion final al enviar el formulario de crear lugar
createPlaceFormElement.addEventListener("submit", (e) => {
  validateCreatePlaceTitle();
  validateCreatePlaceURL();

  if (!createPlaceFormElement.checkValidity()) {
    e.preventDefault();
  }
});

// Validacion del formulario de perfil
function checkFormInputsProfile() {
  const nameVal = profileName.value.trim();
  const dedicationVal = profileDedication.value.trim();

  // Verificar que el nombre esté entre 2 y 40 caracteres
  const isNameValid = nameVal.length >= 2 && nameVal.length <= 40;

  // Verificar que la dedicación esté entre 2 y 200 caracteres
  const isDedicationValid =
    dedicationVal.length >= 2 && dedicationVal.length <= 200;

  // Habilitar o deshabilitar el botón de guardar
  if (isNameValid && isDedicationValid) {
    submitButtonProfile.classList.add("enabled");
    submitButtonProfile.removeAttribute("disabled");
  } else {
    submitButtonProfile.classList.remove("enabled");
    submitButtonProfile.disabled = true;
  }
}

// Validacion de el formulario createPlace
function checkFormInputsPlace() {
  const titleVal = placeTitleInput.value.trim();
  const URLVal = placeUTLInput.value.trim();

  // Verificar que el título esté entre 2 y 30 caracteres
  const isTitleValid = titleVal.length >= 2 && titleVal.length <= 30;

  // Regex para manejar URLs
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?=&%:.~\w\-]*)?$/i;
  const isUrlValid = urlPattern.test(URLVal);

  // Habilitar o deshabilitar el botón de guardar
  if (isTitleValid && isUrlValid) {
    submitButtonCreatePlace.classList.add("enabled");
    submitButtonCreatePlace.removeAttribute("disabled");
  } else {
    submitButtonCreatePlace.classList.remove("enabled");
    submitButtonCreatePlace.disabled = true;
  }
}

// Resetear los formularios
function resetForms() {
  // Reset a inputs y boton del form de perfil
  profileName.value = "";
  profileDedication.value = "";
  submitButtonProfile.disabled = true;
  submitButtonProfile.classList.remove("enabled");

  // Reset a inputs y boton del form de crear lugar
  placeTitleInput.value = "";
  placeUTLInput.value = "";
  submitButtonCreatePlace.disabled = true;
  submitButtonCreatePlace.classList.remove("enabled");
}

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

function openModal(imageSrc, imageTitle) {
  previewImg.src = imageSrc;
  previewTitle.textContent = imageTitle;
  imgPreviewElement.style.display = "flex";
}

function closeModalFunction() {
  imgPreviewElement.style.display = "none";
}

closePreview.addEventListener("click", closeModalFunction);

imgPreviewElement.addEventListener("click", (e) => {
  if (e.target === imgPreviewElement) {
    closeModalFunction();
  }
});

function addClickEventToImage(cardElement) {
  const image = cardElement.querySelector(".gallery__image");
  if (image) {
    image.addEventListener("click", () => {
      const imageTitle = image.alt;
      openModal(image.src, imageTitle);
    });
  }
}

const galleryCards = document.querySelectorAll(".gallery__box");
galleryCards.forEach(addClickEventToImage);

// Tarjetas iniciales
const initialCards = [
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

const galleryContainer = document.querySelector(".gallery");

// Crear una tarjeta
function createCard(card) {
  const galleryBox = document.createElement("div");
  galleryBox.classList.add("gallery__box");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("gallery__deleteButton");

  const deleteImg = document.createElement("img");
  deleteImg.classList.add("gallery__deleteButton-image");
  deleteImg.src = "./images/Trash.svg";
  deleteImg.alt = "Delete button";

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.src = card.link;
  galleryImage.alt = card.name;

  const galleryContainerDiv = document.createElement("div");
  galleryContainerDiv.classList.add("gallery__container");

  const galleryTitle = document.createElement("h3");
  galleryTitle.classList.add("gallery__title");
  galleryTitle.textContent = card.name;

  const likeButton = document.createElement("button");
  likeButton.classList.add("gallery__likeButton");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("gallery__likeButton_active");
  });

  deleteButton.appendChild(deleteImg);
  galleryContainerDiv.appendChild(galleryTitle);
  galleryContainerDiv.appendChild(likeButton);
  galleryBox.appendChild(deleteButton);
  galleryBox.appendChild(galleryImage);
  galleryBox.appendChild(galleryContainerDiv);

  deleteButton.addEventListener("click", () => {
    galleryBox.remove();
  });

  return galleryBox;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  galleryContainer.appendChild(cardElement);
  addClickEventToImage(cardElement);
});
