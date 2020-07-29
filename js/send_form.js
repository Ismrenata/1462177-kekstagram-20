'use strict';
(function () {
  // блок отправки формы, проверки валидации и вывода сообщений об отправки
  var form = document.querySelector('.img-upload__form');
  var onSubmitSuccess = function (text, block) {
    window.utils.showMessage(text, block);
    window.form.clear();
  };
  var onSubmitError = function (error, block) {
    window.utils.showMessage(error, block);
    window.form.clear();
  };
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.form.inputValueMathFloor(); // округление значения поля эффекта
    window.sendForm(form);
  });
  window.sendForm = function (formData) {
    window.upload(new FormData(formData), onSubmitSuccess, onSubmitError);
  };
}());
