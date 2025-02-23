export default class UserInfo {
  constructor({ nameSelector, titleSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._titleElement = document.querySelector(titleSelector);

    if (!this._nameElement || !this._titleElement) {
      throw new Error(
        "No se encontraron los elementos especificados en el DOM."
      );
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      title: this._titleElement.textContent,
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
