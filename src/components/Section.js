export default class Section {
  _containerItem
  _renderer
  cardsList

  constructor (selector, renderer) {
    this._containerItem = document.querySelector(selector);
    this._renderer = renderer;
    this.cardsList = [];
  }
  render(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  appendItem(domElement) {
    this._containerItem.append(domElement);
  }

  prependItem(domElement) {
    this._containerItem.prepend(domElement);
  }

  removeCardFromList(el) {
    const currentIndex = this.cardsList.indexOf(el);
    if (currentIndex !== -1) {
      Array.from(this.cardsList).splice(currentIndex, 1);
    }
  }

}
