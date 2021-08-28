export default class Section {
  _containerItem
  // _items
  _renderer
  cardsList
  // constructor ({items, renderer}, selector) {
  //   this._containerItem = document.querySelector(selector);
  //   //this._items = items;  //данный параметр конструктора описан в задании, его удалять пока нельзя, хотя идея с передачей параметром в функцию и на мой взгляд лучше.
  //   this._renderer = renderer;
  // }

  constructor (selector, renderer) {
    this._containerItem = document.querySelector(selector);
    this._renderer = renderer;
    this.cardsList = [];
    // this._currentId = currentId;
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
