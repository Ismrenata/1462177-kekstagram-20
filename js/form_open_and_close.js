'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');

  var body = document.querySelector('body');
  var form = body.querySelector('.img-upload__form');
  var uploadField = picturesWindow.querySelector('#upload-file'); // поле выбора файла
  var uploadCansel = picturesWindow.querySelector('#upload-cancel');
  var editForm = picturesWindow.querySelector('.img-upload__overlay');
  var uploadSubmit = picturesWindow.querySelector('.img-upload__submit'); // кнопка отправки формы

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };
  var openPopup = function () {
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    // все что ниже в функцию
    window.form.ifOriginalEffect();
  };

  var closePopup = function () {
    body.classList.remove('modal-open');
    editForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadField.value = ''; // сброс значения поля выбора
  };

  uploadField.addEventListener('change', function () {
    openPopup();
    editForm.classList.remove('hidden');
  });

  uploadCansel.addEventListener('click', function () {
    closePopup();

  });
  uploadField.addEventListener('change', function () {
    openPopup();
    editForm.classList.remove('hidden');
  });

  // var maiN = body.children('main');
  var successMessageTemplate = document.querySelector('#success').content;

  var onSuccessMessage = function () {
    var successElement = successMessageTemplate.cloneNode(true);
    body.querySelector('main').appendChild(successElement);
    var successMessage = body.getElementsByClassName('success');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        successMessage.parentNode.removeChild(successMessage);
        // body.querySelector('main').removeChild('.success');
      }
    });
    body.querySelector('.success__button').addEventListener('click', function () {
      successMessage.parentNode.removeChild(successMessage);
    });
  };

  var onSuccessSubmit = function () {
    window.form.ifFormSubmit();
    window.hashValidation.ifFormSubmit();
    body.classList.remove('modal-open');
    editForm.classList.add('hidden');
    onSuccessMessage();
    document.removeEventListener('keydown', onPopupEscPress);
    uploadField.value = ''; // сброс значения поля выбора
  };

  // form submit
  uploadSubmit.addEventListener('click', function (evt) {
    window.hashValidation.isHashIncorrect(evt);
    if (window.hashValidation.isHashIncorrect(evt)) {
      window.upload(new FormData(form), function () {
        onSuccessSubmit();
      }, function () {});
    } else {
      // onErrorSubmit();
      // console.log('где-то ошибочка');
    }

    evt.preventDefault();
  });

}());
