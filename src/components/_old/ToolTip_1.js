export default class ToolTip {
  _dialog

  constructor(selector) {
    this._dialog = document.querySelector(selector);
  }

  show() {
    this._dialog.classList.add('tool-tip_opened');
  }

  hide() {
    this._dialog.classList.remove('tool-tip_opened');
  }

}

