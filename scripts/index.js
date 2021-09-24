const popup = document.querySelector(".popup");
const editButton = document.querySelector(".edit-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const form = popup.querySelector(".input-form");
const closeButton = popup.querySelector(".popup__close-button");
const inputName = popup.querySelector(".input-form__item_user_name");
const inputJob = popup.querySelector(".input-form__item_user_job");

function togglePopup() {
  popup.classList.toggle("popup_is-opened");
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

editButton.addEventListener("click", function () {
  togglePopup();
  updateInputForm();
});

closeButton.addEventListener("click", togglePopup);

form.addEventListener("submit", formSubmitHandler);
