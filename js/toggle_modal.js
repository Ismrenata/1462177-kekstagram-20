'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var body = document.querySelector('body');
  var uploadField = picturesWindow.querySelector('#upload-file'); // поле выбора файла
  var uploadCancel = picturesWindow.querySelector('#upload-cancel');
  var editForm = picturesWindow.querySelector('.img-upload__overlay');
  var commentField = editForm.querySelector('.text__description');
  var hashtagField = editForm.querySelector('.text__hashtags');

  var onPopupEscPress = function (evt) {
    if ((evt.key === 'Escape') && (evt.target !== commentField && evt.target !== hashtagField)) {
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
    window.form.ifFormSubmitandClose();
    uploadField.value = ''; // сброс значения поля выбора
    window.scale.updateScale();
  };
  window.toggleModal = function () {
    uploadField.addEventListener('change', function () {
      openPopup();
      editForm.classList.remove('hidden');
    });

    uploadCancel.addEventListener('click', function () {
      closePopup();

    });
    uploadField.addEventListener('change', function () {
      openPopup();
      editForm.classList.remove('hidden');
    });
  };
}());
