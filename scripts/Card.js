export class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(openPopupHandler) {
    const delButton = this._element.querySelector('.cards__del-button');
    const likeButton = this._element.querySelector('.cards__like-button');

    this._cardImage.addEventListener('click', () => {
      const popup = document.querySelector('.popup_content_image');
      const image = popup.querySelector('.popup__image');
      const imageCaption = popup.querySelector('.popup__image-caption');
      image.src = this._link;
      image.alt = this._name;
      imageCaption.textContent = this._name;
      openPopupHandler(popup);
    });

    delButton.addEventListener('click', (evt) => {
      evt.target.parentNode.remove();
    });

    likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like-button_is-liked');
    });
  }

  createCard(openPopupHandler) {
    console.log()
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards__image');
    this._cardName = this._element.querySelector('.cards__name');
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners(openPopupHandler);
    return this._element;
  }
}