import ToolTip from "./ToolTip.js";
import { formattingUserName } from "../utils/utils.js";

export default class ToolTipWithLikes extends ToolTip {
  _users;
  _currentUserId;

  constructor(selector) {
    super(selector);
    this._users = this._dialog.querySelector(".tool-tip__users");
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
      .querySelector("#tool-tip-like-user")
      .content.querySelector(".tool-tip__user")
      .cloneNode(true);
  }

  _renderUser(user) {
    const userElement = this._getTemplate();
    userElement.querySelector(".tool-tip__user-avatar").src = user.avatar;
    userElement.querySelector(".tool-tip__user-name").textContent =
    this._currentUserId === user._id ? "Вы" : user.name;
    return userElement;
  }

  _renderingUsers(dataUsers) {
    if (dataUsers) {
      Array.from(dataUsers).forEach((user) => {
        this._users.prepend(this._renderUser(user));
      });
    }
    this._dialog.querySelector(".tool-tip__header").textContent =
      "Оценили: " + Array.from(dataUsers).length + " " + formattingUserName(Array.from(dataUsers).length) + ":";
  }

  show({ pageX, pageY, clientY }, dataUsers, currentUserId) {
    this._users.innerHTML = "";
    this._currentUserId = currentUserId;
    this._renderingUsers(dataUsers);
    this._setPosition(pageX, pageY, clientY);
    this._dialog.classList.add("tool-tip_opened");
  }

}
