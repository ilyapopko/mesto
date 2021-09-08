import Popup from "./Popup.js";
import { formattingUserCount } from "../utils/utils.js";

export default class PopupWithViewLikes extends Popup {
  _users;
  _currentUserId;

  constructor(selector) {
    super(selector);
    this._users = this._dialog.querySelector(".popup__like-users");
  }

  _setPosition(x, y, relativeY) {
    this._dialog.style.left = x - this._dialog.offsetWidth - 10 + "px";
    if (relativeY >= this._dialog.offsetHeight) {
      this._dialog.style.top = y - this._dialog.offsetHeight - 5 + "px";
    } else {
      this._dialog.style.top = y + "px";
    }
  }

  _getTemplate() {
    return document
      .querySelector("#popup-like-user")
      .content.querySelector(".popup__like-user")
      .cloneNode(true);
  }

  _renderUser(user) {
    const userElement = this._getTemplate();
    userElement.querySelector(".popup__like-user-avatar").src = user.avatar;
    userElement.querySelector(".popup__like-user-name").textContent =
    this._currentUserId === user._id ? "Вы" : user.name;
    return userElement;
  }

  _renderingUsers(dataUsers) {
    if (dataUsers) {
      Array.from(dataUsers).forEach((user) => {
        this._users.prepend(this._renderUser(user));
      });
    }
    this._dialog.querySelector(".popup__header").textContent =
      "Оценили: " + Array.from(dataUsers).length + " " + formattingUserCount(Array.from(dataUsers).length) + ":";
  }

  show({ pageX, pageY, clientY }, dataUsers, currentUserId) {
    this._users.innerHTML = "";
    this._currentUserId = currentUserId;
    this._renderingUsers(dataUsers);
    this._setPosition(pageX, pageY, clientY);
    super.show();
  }

}
