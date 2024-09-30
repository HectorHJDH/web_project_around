// Busquemos el formulario en el DOM
let formElement = document.querySelector(".form");
const closeButton = document.querySelector(".close__button");
let editButton = document.querySelector(".profile__edit-button");
let submitButton = document.querySelector(".profile__form-submit");
let nameValue = document.querySelector(".profile__name");
let dedicationValue = document.querySelector(".profile__dedication");
let nameInput = document.querySelector("#name");
let dedicationInput = document.querySelector("#dedication");

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

// Cambia la imagen de like en cada botón
likeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const image = button.querySelector(".gallery__likeButton-image");

    if (image.src.includes("Like_Button.svg")) {
      image.src = "./images/Like_Button_active.png";
    } else {
      image.src = "./images/Like_Button.svg";
    }
  });
});
