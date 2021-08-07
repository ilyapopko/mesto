export default class Section {
  _containerItem
  _items
  _renderer

  constructor ({items, renderer}, selector) {
    this._containerItem = document.querySelector(selector);
    this._items = items;
    this._renderer = renderer;

  }

  render() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(domElement) {
    this._containerItem.prepend(domElement);
  }

}
