export default class Api {
  _url;
  _headers;

  constructor(property) {
    this._url = property.url;
    this._headers = property.headers;
  }

  _processingResult(result) {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject({
        status: result.status,
        statusText: result.statusText,
        url: result.url
      });
    }
  }

  getUserProperties() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((result) => {
      return this._processingResult(result);
    })
    .catch(err => {
      return this._processingResult(err);
    });
  }

  updateUserAvatar(linkAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkAvatar,
      }),
    }).then((result) => {
      return this._processingResult(result);
    })
    .catch(err => {
      return this._processingResult(err);
    });
  }

  updateUserProperties(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((result) => {
      return this._processingResult(result);
    })
    .catch(err => {
      return this._processingResult(err);
    });
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((result) => {
      return this._processingResult(result);
    })
    .catch(err => {
      return this._processingResult(err);
    });
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((result) => {
      return this._processingResult(result);
    })
    .catch(err => {
      return this._processingResult(err);
    });
  }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      return this._processingResult(result);
    })
    .catch(err => {
      return this._processingResult(err);
    });
  }

  setLikeCard(isLiked, id) {
    const metodHtml = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: metodHtml,
      headers: this._headers,
    }).then((result) => {
      return this._processingResult(result);
    })
    .catch(err => {
      return this._processingResult(err);
    });
  }
}
