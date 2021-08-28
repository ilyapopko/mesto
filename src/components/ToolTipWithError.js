import ToolTip from "./ToolTip.js";

export default class ToolTipWithError extends ToolTip {
  _textErrorElement

  constructor(selector) {
    super(selector);
    this._textErrorElement = this._dialog.querySelector('.tool-tip__caption');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseFromMouseClick = this._handleCloseFromMouseClick.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.hide();
    }
  }

  _handleCloseFromMouseClick() {
    this.hide();
  }

  _formatTheError({status, statusText, url}) {
    let caption = '';
    if (status === 404) {
      caption = 'Указанный адрес не существует: ' + url;
    } else if (status === undefined) {
      caption = 'Сервер недоступен или отсутствует подключение к Интернету.';
    } else {
      caption = statusText;
    }
    return (status === undefined ? '' : status + ' ') + caption;
  }

  show(err) {
    if (typeof err === 'object') {
      this._textErrorElement.textContent = this._formatTheError(err);
    } else {
      this._textErrorElement.textContent = err;
    }

    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleCloseFromMouseClick);
    super.show();
  }

  hide() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleCloseFromMouseClick);
    super.hide();
  }
}
