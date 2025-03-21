export default class UserInfo {
  constructor({ nameSelector, titleSelector }) {
    this._nameInput = document.querySelector(nameSelector);
    this._titleInput = document.querySelector(titleSelector);

    if (!this._nameInput || !this._titleInput) {
      throw new Error(
        "No se encontraron los elementos especificados en el DOM."
      );
    }
  }

  getUserInfo() {
    return {
      name: this._nameInput.textContent,
      title: this._titleInput.textContent,
    };
  }

  setUserInfo({ name, title }) {
    const nameValueProfile = document.querySelector(".profile__name");
    const dedicationValueProfile = document.querySelector(
      ".profile__dedication"
    );

    nameValueProfile.textContent = name;
    dedicationValueProfile.textContent = title;
  }
}
