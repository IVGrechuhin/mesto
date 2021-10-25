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
const closeButtons = document.querySelectorAll('.popup__close-button');
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
    togglePopup(popupImage);
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


function togglePopup(popup) { // открываем-закрываем поп-ап, в качестве аргумента - нужный поп-ап
  popup.classList.toggle('popup_is-opened');
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
  togglePopup(popupEditProfile);
}

function formAddPlaceSubmitHandler() { //функция submit для формы добавления карточки
  const newCard = {};
  newCard.name = inputCardName.value;
  newCard.link = inputCardLink.value;
  addCard(newCard);
  togglePopup(popupAddCard);
  inputCardName.value = ''; //обнуляем значения в полях ввода
  inputCardLink.value = '';
}
editButton.addEventListener('click', function () { //обработчик кнопки редактирования профиля
  togglePopup(popupEditProfile);
  updateFormEditProfile();
});

addButton.addEventListener('click', function () { //обработчик кнопки добавления карточки
  togglePopup(popupAddCard);
});

closeButtons.forEach(el => { //добавляем обработчик на все кнопки закрытия из массива closeButtons.
  el.addEventListener('click', function (evt) { togglePopup(evt.target.closest('.popup')) }); //обработчик кнопки закрытия - чтобы срабатывала для того поп-апа который открыт.
})


formEditProfile.addEventListener('submit', formEditProfileSubmitHandler); //обработчик submit для формы редактирования профиля

formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler); //обработчик submit для формы добавления карточки

initialCards.forEach(el => { //добавляем карточки при загрузке страницы
  addCard(el);
});