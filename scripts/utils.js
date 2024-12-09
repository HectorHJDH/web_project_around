const profileFormElement = document.querySelector(".profile__form");
const profileForm = document.forms.profileF;
const profileName = profileForm.elements.name;
const profileDedication = profileForm.elements.dedication;
const nameValueProfile = document.querySelector(".profile__name");
const dedicationValueProfile = document.querySelector(".profile__dedication");
const profileFormBackground = document.querySelector(".profile__background");
const submitButtonProfile = profileFormElement.querySelector(
  ".profile__form-submit"
);
const imgPreviewElement = document.querySelector(".image__view");
const previewImg = document.querySelector(".image__view-img");
const previewTitle = document.querySelector(".image__view-title");
const profileNameError = document.getElementById("profile-name-error");

const profileDedicationError = document.getElementById(
  "profile-dedication-error"
);

const createPlaceFormElement = document.querySelector(".createPlace__form");
const submitButtonCreatePlace = createPlaceFormElement.querySelector(
  ".createPlace__form-submit"
);
const createPlaceFormBackground = document.querySelector(
  ".createPlace__background"
);

const placeTitleError = document.getElementById("createPlace-title-error");
const placeURLError = document.getElementById("createPlace-url-error");

const createPlaceForm = document.forms.createPlaceF;
const placeTitleInput = createPlaceForm.elements.placeTitle;
const placeUTLInput = createPlaceForm.elements.placeURL;

const galleryContainer = document.querySelector(".gallery");

// Tarjetas iniciales
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

// Formulario de modificar datos del perfil
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameValueProfile.textContent = profileName.value;
  dedicationValueProfile.textContent = profileDedication.value;
  profileFormElement.style.display = "none";
  profileFormBackground.style.display = "none";
}

// Formulario de crear un lugar
export function handleCreatePlaceFormSubmit(evt) {
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

// Validación de inputs para nombre y dedicación
export function validateProfileName() {
  if (!profileName.validity.valid) {
    profileNameError.textContent = profileName.validationMessage;
    profileNameError.style.display = "block";
  } else {
    profileNameError.textContent = "";
    profileNameError.style.display = "none";
  }
  submitButtonProfile.disabled = !profileForm.checkValidity();
}

export function validateProfileDedication() {
  if (!profileDedication.validity.valid) {
    profileDedicationError.textContent = profileDedication.validationMessage;
    profileDedicationError.style.display = "block";
  } else {
    profileDedicationError.textContent = "";
    profileDedicationError.style.display = "none";
  }
  submitButtonProfile.disabled = !profileForm.checkValidity();
}

// Validación de inputs del formulario de crear lugar
export function validateCreatePlaceTitle() {
  if (!placeTitleInput.validity.valid) {
    placeTitleError.textContent = placeTitleInput.validationMessage;
    placeTitleError.style.display = "block";
  } else {
    placeTitleError.textContent = "";
    placeTitleError.style.display = "none";
  }
  submitButtonCreatePlace.disabled = !createPlaceForm.checkValidity();
}

export function validateCreatePlaceURL() {
  if (!placeUTLInput.validity.valid) {
    placeURLError.textContent = placeUTLInput.validationMessage;
    placeURLError.style.display = "block";
  } else {
    placeURLError.textContent = "";
    placeURLError.style.display = "none";
  }
  submitButtonCreatePlace.disabled = !createPlaceForm.checkValidity();
}

// Verificar la validez del formulario de perfil
export function checkFormInputsProfile() {
  const nameVal = profileName.value.trim();
  const dedicationVal = profileDedication.value.trim();
  const isNameValid = nameVal.length >= 2 && nameVal.length <= 40;
  const isDedicationValid =
    dedicationVal.length >= 2 && dedicationVal.length <= 200;

  if (isNameValid && isDedicationValid) {
    submitButtonProfile.classList.add("enabled");
    submitButtonProfile.removeAttribute("disabled");
  } else {
    submitButtonProfile.classList.remove("enabled");
    submitButtonProfile.setAttribute("disabled", true);
  }
}

// Verificar la validez del formulario de creación de lugar
export function checkFormInputsPlace() {
  const titleVal = placeTitleInput.value.trim();
  const URLVal = placeUTLInput.value.trim();
  const isTitleValid = titleVal.length >= 2 && titleVal.length <= 30;
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?=&%:.~\w\-]*)?$/i;
  const isUrlValid = urlPattern.test(URLVal);

  if (isTitleValid && isUrlValid) {
    submitButtonCreatePlace.classList.add("enabled");
    submitButtonCreatePlace.removeAttribute("disabled");
  } else {
    submitButtonCreatePlace.classList.remove("enabled");
    submitButtonCreatePlace.setAttribute("disabled", true);
  }
}

// Resetear los formularios
export function resetForms() {
  profileName.value = "";
  profileDedication.value = "";
  submitButtonProfile.setAttribute("disabled", true);
  submitButtonProfile.classList.remove("enabled");

  placeTitleInput.value = "";
  placeUTLInput.value = "";
  submitButtonCreatePlace.setAttribute("disabled", true);
  submitButtonCreatePlace.classList.remove("enabled");
}

// Modal para previsualización de imágenes
export function openModal(imageSrc, imageTitle) {
  previewImg.src = imageSrc;
  previewTitle.textContent = imageTitle;
  imgPreviewElement.style.display = "flex";
}

export function closeModalFunction() {
  imgPreviewElement.style.display = "none";
}

// Agregar evento de clic en la imagen de la tarjeta
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

export function createCard(card) {
  // creating main card container -
  const galleryBox = document.createElement("div");
  galleryBox.classList.add("card__area");

  // creating delete button - ya en card
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("card__delete-icon");

  // creating gallery image icon - ya en card
  const galleryImage = document.createElement("img");
  galleryImage.classList.add("card__image");
  galleryImage.src = card.link;
  galleryImage.alt = card.name;

  // creating gallery container div - ya en card
  const galleryContainerDiv = document.createElement("div");
  galleryContainerDiv.classList.add("card__menu");

  // adding title to gallery container div - ya en card
  const galleryTitle = document.createElement("h3");
  galleryTitle.classList.add("card__title");
  galleryTitle.textContent = card.name;

  // creating like button - ya en card
  const likeButton = document.createElement("button");
  likeButton.classList.add("card__like");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like_active");
  });

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
