export default class UserInfo {
  _userElement
  _specializationElement

  constructor (selUser, selSpecialization) {
    this._userElement = document.querySelector(selUser);
    this._specializationElement = document.querySelector(selSpecialization);
  }

  getUserInfo() {
    return {user:           this._userElement.textContent,
            specialization: this._specializationElement.textContent};
  }

  setUserInfo(user, specialization) {
    this._userElement.textContent = user;
    this._specializationElement.textContent = specialization;
  }
}
