export default class Section {
  constructor({ items, renderer }, CardContainerSelector) {
    this._items = items; // Datos que se renderizarán
    this._renderer = renderer; // Función para renderizar los elementos
    this._container = document.querySelector(CardContainerSelector); // Contenedor donde se agregarán los elementos

    if (!this._container) {
      throw new Error(
        `No se encontró el contenedor con el selector: ${CardContainerSelector}`
      );
    }
  }

  // Renderiza todos los elementos en la página utilizando la función renderer
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Llama a la función renderer para cada elemento
    });
  }

  // Agrega un nuevo elemento al contenedor
  addItem(element) {
    this._container.append(element);
  }
}
