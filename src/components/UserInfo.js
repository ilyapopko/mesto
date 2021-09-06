export default class UserInfo {
  _userName
  _userId
  _userAvatar
  _userAbout

  constructor (selUser, selAvatar, selAbout) {
    this._userName = document.querySelector(selUser);
    this._userAvatar = document.querySelector(selAvatar);
    this._userAbout = document.querySelector(selAbout);
  }

  getUserInfo() {
    return {name:   this._userName.textContent,
            about:  this._userAbout.textContent,
            id:     this._userId,
            avatar: this._userAvatar.src};
  }

  setUserInfo(properties) {
    this._userName.textContent = properties.name;
    this._userAbout.textContent = properties.about;
    this._userAvatar.src = properties.avatar;
    this._userId = properties._id;
  }
}
