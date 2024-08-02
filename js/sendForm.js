const removePhoto = document.getElementById("remove-photo");
const formRef = document.querySelector(".form");
const backdrop = document.getElementById("backdrop");
removePhoto.addEventListener("click", function () {
  document.getElementById("organization-photo").value = "";
});

formRef.addEventListener("submit", function (e) {
  e.preventDefault();

  if (e.target.checkValidity()) {
    const formData = new FormData(e.target);
    formData.forEach((value, name) => {
      console.log(`${name}: ${value}`);
    });
    alert("Форма отправлена!");
    formRef.reset();
    backdrop.classList.add("is-hidden");
  } else {
    alert("Заполните все обязательные поля!");
  }
});
