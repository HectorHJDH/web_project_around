// Busquemos el formulario en el DOM
// profile__form
const profileFormElement = document.querySelector(".profile__form");
const closeButtonProfile = profileFormElement.querySelector(".close__button");
const editButtonProfile = document.querySelector(".profile__editButton");
const submitButtonProfile = profileFormElement.querySelector(
  ".profile__form-submit"
);
const nameValueProfile = document.querySelector(".profile__name");
const dedicationValueProfile = document.querySelector(".profile__dedication");
const nameInputProfile = profileFormElement.querySelector("#name");
const dedicationInputProfile = profileFormElement.querySelector("#dedication");

// createPlace__form
const createPlaceFormElement = document.querySelector(".createPlace__form");
const closeButtonCreatePlace =
  createPlaceFormElement.querySelector(".close__button");
const submitButtonCreatePlace = createPlaceFormElement.querySelector(
  ".profile__form-submit"
);
const nameInputPlace = createPlaceFormElement.querySelector("#name");
const dedicationInputPlace =
  createPlaceFormElement.querySelector("#dedication");
const createPlaceButton = document.querySelector(".createPlace__button");

// Formulario del perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameValueProfile.textContent = nameInputProfile.value;
  dedicationValueProfile.textContent = dedicationInputProfile.value;

  console.log(nameValueProfile.textContent);
  console.log(dedicationValueProfile.textContent);

  profileFormElement.style.display = "none";
}

// Formulario de crear un lugar
function handleCreatePlaceFormSubmit(evt) {
  evt.preventDefault();

  const placeTitle = nameInputPlace.value;
  const placeImageUrl = dedicationInputPlace.value;

  if (placeTitle && placeImageUrl) {
    const newCard = createCard({ name: placeTitle, link: placeImageUrl });

    galleryContainer.appendChild(newCard);

    createPlaceFormElement.style.display = "none";
    resetCreatePlaceForm();
  }
}

function checkFormInputsProfile() {
  const nameVal = nameInputProfile.value.trim();
  const dedicationVal = dedicationInputProfile.value.trim();

  if (nameVal !== "" && dedicationVal !== "") {
    submitButtonProfile.classList.add("enabled");
    submitButtonProfile.removeAttribute("disabled");
  } else {
    submitButtonProfile.classList.remove("enabled");
    submitButtonProfile.setAttribute("disabled", true);
  }
}

function checkFormInputsPlace() {
  const nameVal = nameInputPlace.value.trim();
  const dedicationVal = dedicationInputPlace.value.trim();

  if (nameVal !== "" && dedicationVal !== "") {
    submitButtonCreatePlace.classList.add("enabled");
    submitButtonCreatePlace.removeAttribute("disabled");
  } else {
    submitButtonCreatePlace.classList.remove("enabled");
    submitButtonCreatePlace.setAttribute("disabled", true);
  }
}

function resetProfileForm() {
  nameInputProfile.value = "";
  dedicationInputProfile.value = "";
  submitButtonProfile.setAttribute("disabled", true);
}

function resetCreatePlaceForm() {
  nameInputPlace.value = "";
  dedicationInputPlace.value = "";
  submitButtonCreatePlace.setAttribute("disabled", true);
}

nameInputProfile.addEventListener("input", checkFormInputsProfile);
dedicationInputProfile.addEventListener("input", checkFormInputsProfile);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

editButtonProfile.addEventListener("click", () => {
  profileFormElement.style.display = "block";
  resetProfileForm();
});

closeButtonProfile.addEventListener("click", () => {
  profileFormElement.style.display = "none";
});

nameInputPlace.addEventListener("input", checkFormInputsPlace);
dedicationInputPlace.addEventListener("input", checkFormInputsPlace);
createPlaceFormElement.addEventListener("submit", handleCreatePlaceFormSubmit);

createPlaceButton.addEventListener("click", () => {
  createPlaceFormElement.style.display = "block";
  resetCreatePlaceForm();
});

closeButtonCreatePlace.addEventListener("click", () => {
  createPlaceFormElement.style.display = "none";
});

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
});
