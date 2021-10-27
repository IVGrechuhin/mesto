const initialCards = [
  {
    name: 'Карабаш',
    link: './images/place-karabash.jpg'
  },
  {
    name: 'Откликной гребень',
    link: './images/place-otkliknoy-greben.jpg'
  },
  {
    name: 'Сим',
    link: './images/place-sim.jpg'
  },
  {
    name: 'Сугомак',
    link: './images/place-sugomak.jpg'
  },
  {
    name: 'Таганай',
    link: './images/place-taganay.jpg'
  },
  {
    name: 'Зюраткуль',
    link: './images/place-zyuratkul.jpg'
  }
];
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupAddCard = document.querySelector('.popup_content_add-place');
const popupImage = document.querySelector('.popup_content_image');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileProfession = profile.querySelector('.profile__profession');
const formEditProfile = popupEditProfile.querySelector('.form_content_edit-profile');
const formAddPlace = popupAddCard.querySelector('.form_content_add-place');
const inputName = popupEditProfile.querySelector('.form__item_user_name');
const inputJob = popupEditProfile.querySelector('.form__item_user_job');
const inputCardName = popupAddCard.querySelector('.form__item_place_name');
const inputCardLink = popupAddCard.querySelector('.form__item_place_link');
const cardContainer = document.querySelector('.cards');
const image = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__image-caption');

function createCard(elem) { //функция создания карточки с местом, аргумент - объект с двумя ключами name и link
  const card = document.querySelector('#card').content.cloneNode(true);
  const delButton = card.querySelector('.cards__del-button');
  const cardImage = card.querySelector('.cards__image');
  const likeButton = card.querySelector('.cards__like-button');
  card.querySelector('.cards__name').textContent = elem.name;
  cardImage.alt = elem.name;
  cardImage.src = elem.link;

  cardImage.addEventListener('click', function () { //вешаем обработчик нажатия на карточку.
    image.src = elem.link;
    image.alt = elem.name;
    imageCaption.textContent = elem.name;
    openPopup(popupImage);
  });

  delButton.addEventListener('click', function (evt) { //вешаем обработчик кнопки удалить.
    evt.target.parentNode.remove(); //удаляем карточку - она родитель для кнопки.
  });

  likeButton.addEventListener('click', function (evt) { //вешаем обработчик кнопки лайк.
    evt.target.classList.toggle('cards__like-button_is-liked'); //меняем у неё модификатор на лайк или обратно
  });
  return card;
}

function addCard(elem) { //функция добавления карточки с местом, аргумент - объект с двумя ключами name и link
  const card = createCard(elem);
  cardContainer.prepend(card);
}


function updateFormEditProfile() { //обновляем данные в форме при открытии формы
  inputName.value = profileName.textContent;
  inputJob.value = profileProfession.textContent;
}

function formEditProfileSubmitHandler() { //функция submit для формы редактирования профиля
  const name = inputName.value;
  const job = inputJob.value;
  profileName.textContent = name;
  profileProfession.textContent = job;
  closePopup(popupEditProfile);
}

function formAddPlaceSubmitHandler() { //функция submit для формы добавления карточки
  const newCard = {};
  newCard.name = inputCardName.value;
  newCard.link = inputCardLink.value;
  addCard(newCard);
  closePopup(popupAddCard);
}

function clearFormInputs(form) { //функция очистки полей формы
  const inputs = Array.from(form.querySelectorAll('.form__item'));
  inputs.forEach((input) => {
    input.value = '';
    input.classList.remove('form__item_type_error');//удаляем класс ошибки с поля ввода
  });
}

function clearFormErrors(form) { //функция очистки ошибок формы (иначе если закрыть с ошибками, то при открытии они остаются)
  const errors = Array.from(form.querySelectorAll('.form__input-error'));
  errors.forEach((error) => {
    error.textContent = '';
    error.classList.remove('form__input-error_visible');
  });
}

function disableSubmitButton(form) { //функция дезактивации кнопки сабмит (чтобы не было багов при открытии-закрытии форм)
  const button = form.querySelector('.form__save-button');
  button.disabled = true;
  button.classList.add('form__save-button_disabled');
}

function enableSubmitButton(form) { //функция активации кнопки сабмит (чтобы не было багов при открытии-закрытии форм)
  const button = form.querySelector('.form__save-button');
  button.disabled = false;
  button.classList.remove('form__save-button_disabled');
}

function closePopup(popup) { //закравыем попап
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keydownHandler);
}

function openPopup(popup) { //открываем попап
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keydownHandler);
}

function setEventListenersToPopups() { //фунция установки слушателей кликов на все поп-апы
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if ((event.target === event.currentTarget) || (event.target.classList.contains('popup__close-button'))) {
        closePopup(popup);
      }
    })
  })
}

function keydownHandler(event) { //оброботчик события нажатия клавиши esc
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}

setEventListenersToPopups();

editButton.addEventListener('click', function () { //обработчик кнопки редактирования профиля
  clearFormInputs(formEditProfile);
  clearFormErrors(formEditProfile);
  enableSubmitButton(formEditProfile);
  updateFormEditProfile();
  openPopup(popupEditProfile);

});

addButton.addEventListener('click', function () { //обработчик кнопки добавления карточки
  clearFormInputs(formAddPlace);
  clearFormErrors(formAddPlace);
  disableSubmitButton(formAddPlace);
  openPopup(popupAddCard);
});


formEditProfile.addEventListener('submit', formEditProfileSubmitHandler); //обработчик submit для формы редактирования профиля

formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler); //обработчик submit для формы добавления карточки

initialCards.forEach(el => { //добавляем карточки при загрузке страницы
  addCard(el);
});