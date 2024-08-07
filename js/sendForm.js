const removePhoto = document.getElementById("remove-photo");
const formRef = document.querySelector(".form");
const backdrop = document.getElementById("backdrop");
const choosePhoto = document.querySelector(".form-group__input-photo");
const inputPhotoRef = document.getElementById("organization-photo");
const phoneInput = document.getElementById("organization-phone");

//наложение маски на форму
document.addEventListener("DOMContentLoaded", function () {
  const prefixNumber = (str) => {
    if (str === "7") {
      return "7 (";
    }
    if (str === "8") {
      return "8 (";
    }
    if (str === "9") {
      return "7 (9";
    }
    return "7 (";
  };

  // ======================================
  phoneInput.addEventListener("input", (e) => {
    const value = phoneInput.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    if (phoneInput.value.includes("+8") || phoneInput.value[0] === "8") {
      result = "";
    } else {
      result = "+";
    }

    //
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          result += prefixNumber(value[i]);
          continue;
        case 4:
          result += ") ";
          break;
        case 7:
          result += "-";
          break;
        case 9:
          result += "-";
          break;
        default:
          break;
      }
      result += value[i];
    }
    //
    phoneInput.value = result;
  });
});
// функция для валидации номера телефона
const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(phoneNumber);
};
// предпросмотр изображения
inputPhotoRef.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      choosePhoto.style = `background-image:url(${e.target.result});`;
    };
    reader.readAsDataURL(file);
  }
});
// удаление фото при клике на крестик
removePhoto.addEventListener("click", function () {
  inputPhotoRef.value = "";
  choosePhoto.style.backgroundImage = 'url("../images/photo.webp")';
});
// отправка формы
formRef.addEventListener("submit", function (e) {
  e.preventDefault();
  const phoneNumber = phoneInput.value;
  if (!validatePhoneNumber(phoneNumber)) {
    alert("Введите корректный номер телефона!");
    return;
  }
  if (e.target.checkValidity()) {
    const formData = new FormData(e.target);
    formData.forEach((value, name) => {
      console.log(`${name}: ${value}`);
    });
    alert("Форма отправлена!");
    formRef.reset();
    inputPhotoRef.value = "";
    choosePhoto.style.backgroundImage = 'url("../images/photo.webp")';
    backdrop.classList.add("is-hidden");
  } else {
    alert("Заполните все обязательные поля!");
  }
});
