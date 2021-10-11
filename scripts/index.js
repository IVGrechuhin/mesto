const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupAddCard = document.querySelector('.popup_content_add-place');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileProfession = profile.querySelector('.profile__profession');
const formEditProfile = popupEditProfile.querySelector('.input-form_content_edit-profile');
const formAddPlace = popupAddCard.querySelector('.input-form_content_add-place');
const closeButtons = document.querySelectorAll('.popup__close-button');
const inputName = popupEditProfile.querySelector('.input-form__item_user_name');
const inputJob = popupEditProfile.querySelector('.input-form__item_user_job');
const inputCardName = popupAddCard.querySelector('.input-form__item_place_name');
const inputCardLink = popupAddCard.querySelector('.input-form__item_place_link');
const cardContainer = document.querySelector('.cards');


initialCards.reverse(); //шоб как в описании проектной работы)

function addCard(elem) { //функция добавления карточки с местом, аргумент - объект с двумя ключами name и link
  const card = document.querySelector('#card').content.cloneNode(true);
  const delButton = card.querySelector('.cards__del-button');
  card.querySelector('.cards__name').textContent = elem.name;
  card.querySelector('.cards__image').alt = elem.name;
  card.querySelector('.cards__image').src = elem.link;
  delButton.addEventListener('click', function (evt) { //вешаем обработчик кнопки удалить.
    evt.target.parentNode.remove(); //удаляем карточку - она родитель для кнопки.
  });
  cardContainer.prepend(card);
}

function togglePopup(popup) { // открываем-закрываем поп-ап, в качестве аргумента - нужный поп-ап
  console.log(popup);
  popup.classList.toggle('popup_is-opened');
}

function updateFormEditProfile() { //обновляем данные в форме при открытии формы
  inputName.value = profileName.textContent;
  inputJob.value = profileProfession.textContent;
}

function formEditProfileSubmitHandler(evt) { //функция submit для формы редактирования профиля
  evt.preventDefault();
  let name = inputName.value;
  let job = inputJob.value;
  profileName.textContent = name;
  profileProfession.textContent = job;
  togglePopup(popupEditProfile);
}

function formAddPlaceSubmitHandler(evt) { //функция submit для формы добавления карточки
  evt.preventDefault();
  let newCard = {};
  newCard.name = inputCardName.value;
  newCard.link = inputCardLink.value;
  addCard(newCard);
  togglePopup(popupAddCard);
  inputCardName.value = '';
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