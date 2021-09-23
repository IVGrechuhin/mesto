let popup = document.querySelector(".popup");
let editButton = document.querySelector(".edit-button");
let closeButton = document.querySelector(".popup__close-button");
console.log(editButton);

function togglePopup() {
  popup.classList.toggle("popup_is-opened");
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
