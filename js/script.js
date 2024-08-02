const btnOpen = document.getElementById("open-modal");
const modalBg = document.getElementById("backdrop");
const btnClose = document.getElementById("close-modal");

function modal() {
  modalBg.classList.toggle("is-hidden");
}

btnOpen.addEventListener("click", modal);
btnClose.addEventListener("click", modal);
