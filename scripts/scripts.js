// profile__form --------------------------------------------------------
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

// createPlace__form --------------------------------------------------------
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
const nameInputPlace = createPlaceForm.elements.placeTitle;
const dedicationInputPlace = createPlaceForm.elements.placeURL;

// Formulario del perfil --------------------------------------------------------
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameValueProfile.textContent = profileName.value;
  dedicationValueProfile.textContent = profileDedication.value;

  profileFormElement.style.display = "none";
  profileFormBackground.style.display = "none";
}

// Formulario de crear un lugar --------------------------------------------------------
function handleCreatePlaceFormSubmit(evt) {
  evt.preventDefault();

  const placeTitle = nameInputPlace.value;
  const placeImageUrl = dedicationInputPlace.value;

  if (placeTitle && placeImageUrl) {
    const newCard = createCard({ name: placeTitle, link: placeImageUrl });
    galleryContainer.appendChild(newCard);
    addClickEventToImage(newCard);

    createPlaceFormElement.style.display = "none";
    createPlaceFormBackground.style.display = "none";
    resetForms();
  }
}

// Cerrar los formularios con la tecla "Escape" --------------------------------------------------------
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    profileFormElement.style.display = "none";
    profileFormBackground.style.display = "none";
    createPlaceFormElement.style.display = "none";
    createPlaceFormBackground.style.display = "none";
  }
});

// Validación de el formulario profile --------------------------------------------------------
function checkFormInputsProfile() {
  const nameVal = profileName.value.trim();
  const dedicationVal = profileDedication.value.trim();

  if (nameVal !== "" && dedicationVal !== "") {
    submitButtonProfile.classList.add("enabled");
    submitButtonProfile.removeAttribute("disabled");
  } else {
    submitButtonProfile.classList.remove("enabled");
    submitButtonProfile.disabled = true;
  }
}

// Validación de el formulario createPlace --------------------------------------------------------
function checkFormInputsPlace() {
  const nameVal = nameInputPlace.value.trim();
  const dedicationVal = dedicationInputPlace.value.trim();

  if (nameVal !== "" && dedicationVal !== "") {
    submitButtonCreatePlace.classList.add("enabled");
    submitButtonCreatePlace.removeAttribute("disabled");
  } else {
    submitButtonCreatePlace.classList.remove("enabled");
    submitButtonCreatePlace.disabled = true;
  }
}

// Resetear los formularios --------------------------------------------------------
function resetForms() {
  // Reset profile form inputs and disable submit button
  profileName.value = "";
  profileDedication.value = "";
  submitButtonProfile.disabled = true;
  submitButtonProfile.classList.remove("enabled");

  // Reset place creation form inputs and disable submit button
  nameInputPlace.value = "";
  dedicationInputPlace.value = "";
  submitButtonCreatePlace.disabled = true;
  submitButtonCreatePlace.classList.remove("enabled");
}

// Eventos profile --------------------------------------------------------

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
  // Check if the click is outside the form
  if (event.target === profileFormBackground) {
    profileFormBackground.style.display = "none"; // Hide the background and form
  }
});

// Eventos createPlace --------------------------------------------------------
nameInputPlace.addEventListener("input", checkFormInputsPlace);
dedicationInputPlace.addEventListener("input", checkFormInputsPlace);
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
  // Check if the click is outside the form
  if (event.target === createPlaceFormBackground) {
    createPlaceFormBackground.style.display = "none"; // Hide the background and form
  }
});

// Click en una imagen --------------------------------------------------------
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
