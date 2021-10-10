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
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileProfession = profile.querySelector('.profile__profession');
const form = popup.querySelector('.input-form');
const closeButton = popup.querySelector('.popup__close-button');
const inputName = popup.querySelector('.input-form__item_user_name');
const inputJob = popup.querySelector('.input-form__item_user_job');
const cardContainer = document.querySelector('.cards');

function addCard(elem) {
  const card = document.querySelector('#card').content.cloneNode(true);
  card.querySelector('.cards__name').textContent = elem.name;
  card.querySelector('.cards__image').src = elem.link;
  cardContainer.append(card);
}

function togglePopup() {
  popup.classList.toggle('popup_is-opened');
}

function updateInputForm() {
  inputName.value = profileName.textContent;
  inputJob.value = profileProfession.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = inputName.value;
  let job = inputJob.value;
  profileName.textContent = name;
  profileProfession.textContent = job;
  togglePopup();
}

editButton.addEventListener('click', function () {
  togglePopup();
  updateInputForm();
});

closeButton.addEventListener('click', togglePopup);

form.addEventListener('submit', formSubmitHandler);

initialCards.forEach(el => {
  addCard(el);
});