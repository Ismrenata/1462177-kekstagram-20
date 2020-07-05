'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');

  // дом задание лекция 4
  var body = document.querySelector('body');
  var uploadField = picturesWindow.querySelector('#upload-file');// поле выбора файла
  var uploadCansel = picturesWindow.querySelector('#upload-cancel');
  var editForm = picturesWindow.querySelector('.img-upload__overlay');


  var fieldsetFilterList = picturesWindow.querySelector('.img-upload__effects');
  var fieldsetEffectLevel = picturesWindow.querySelector('.img-upload__effect-level');
  var effectLevelSlider = fieldsetEffectLevel.querySelector('.effect-level__pin'); // ползунок

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
  uploadSubmit.addEventListener('click', function (evt) {
    window.hashValidation.isHashIncorrect(evt);
  });
  // обработчик на радиокнопки (при изменении состояния возращает начальное положение )
  fieldsetFilterList.addEventListener('change', function (evt) {
    window.form.updateSliderPosition(evt);
    // нужно прописать для ползунка изменения и линии, но это потом, и думаю сейчас не нужно
  });

  effectLevelSlider.addEventListener('mouseup', function (evt) {
    window.form.computePosition(evt.pageX);
  });

}());
