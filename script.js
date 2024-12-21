const popup = document.querySelector("#popup");
const menu = document.querySelector(".menu");
const body = document.body;
const burger = document.querySelector(".burger");
burger.addEventListener("click", hambHandler);

function hambHandler(e) {
  popup.classList.toggle("open");
  burger.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

let feedback = document.querySelectorAll(".modal-button");
let modal = document.querySelector(".modal");
let close = document.querySelector(".modal__close");

feedback.forEach((elem) => {
  elem.addEventListener("click", function () {
    modal.style.display = "block";
    body.classList.add("noscroll");
  });
});
if (close) {
  close.addEventListener("click", closeModal);
}
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) closeModal();
  });
}

function closeModal() {
  if (modal) modal.style.display = "none";
  body.classList.remove("noscroll");
}
