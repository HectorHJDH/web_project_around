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
    this._nameElement.textContent = name;
    this._titleElement.textContent = title;
  }
}
