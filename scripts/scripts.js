// Busquemos el formulario en el DOM
const formElement = document.querySelector(".form");
const closeButton = document.querySelector(".close__button");
const editButton = document.querySelector(".profile__edit-button");
const submitButton = document.querySelector(".profile__form-submit");
const nameValue = document.querySelector(".profile__name");
const dedicationValue = document.querySelector(".profile__dedication");
const nameInput = document.querySelector("#name");
const dedicationInput = document.querySelector("#dedication");

const likeButtons = document.querySelectorAll(".gallery__likeButton");

// Función que maneja la entrega del formulario
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameValue.textContent = nameInput.value;
  dedicationValue.textContent = dedicationInput.value;

  console.log(nameValue.textContent);
  console.log(dedicationValue.textContent);

  formElement.style.display = "none";
}

// Habilitar o deshabilitar el botón de submit
function checkFormInputs() {
  const nameVal = nameInput.value.trim();
  const dedicationVal = dedicationInput.value.trim();

  if (nameVal !== "" && dedicationVal !== "") {
    submitButton.classList.add("enabled");
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.remove("enabled");
    submitButton.setAttribute("disabled", true);
  }
}

// Función para restablecer los campos del formulario
function resetForm() {
  nameInput.value = "";
  dedicationInput.value = "";
  submitButton.setAttribute("disabled", true); // Desactiva el botón de guardar al abrir el formulario
}

nameInput.addEventListener("input", checkFormInputs);
dedicationInput.addEventListener("input", checkFormInputs);
formElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", () => {
  formElement.style.display = "block";
  resetForm();
});

closeButton.addEventListener("click", () => {
  formElement.style.display = "none";
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
