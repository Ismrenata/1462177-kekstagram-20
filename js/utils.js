'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var uploadField = picturesWindow.querySelector('#upload-file');
  var body = document.querySelector('body');
  var main = body.querySelector('main');// тег main для вывода сообщений об отправки формы
  var editForm = picturesWindow.querySelector('.img-upload__overlay');
  var commentField = editForm.querySelector('.text__description');
  var hashtagField = editForm.querySelector('.text__hashtags');


  var TemplateType = {
    ERROR: 'error',
    SUCCESS: 'success'
  };

  var onPopupEscPress = function (evt) {
    if ((evt.key === 'Escape') && (evt.target !== commentField && evt.target !== hashtagField)) {
      evt.preventDefault();
      hideModal();
    }
  };

  var chooseMessage = function () {
    var message;
    if (main.contains(main.querySelector('.success'))) {
      message = main.querySelector('.success');
    } else {
      message = main.querySelector('.error');
    }
    return message;
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var message = chooseMessage();
      // если один из обработчиков сработает удаляем другие
      document.removeEventListener('click', clickOnScreen);
      // document.removeEventListener('keydown', onMessageEscPress);
      main.removeChild(message);
    }
  };
  var clickOnScreen = function () {
    var element = chooseMessage();
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', clickOnScreen);
    main.removeChild(element);
  };

  var showModal = function () {
    body.classList.add('modal-open');
    editForm.classList.remove('hidden');
    window.form.clearEffect();
    document.addEventListener('keydown', onPopupEscPress);
    // все что ниже в функцию
  };

  var hideModal = function () {
    body.classList.remove('modal-open');
    editForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.form.isFormSubmitandClose();
    uploadField.value = ''; // сброс значения поля выбора
    window.scale.updateScale();
  };

  var showMessage = function (text, block) {
    window.utils.hideModal();
    var messageTemplate = document.querySelector('#' + block).content;
    var element = messageTemplate.cloneNode(true);
    element.querySelector('.' + block + '__title').textContent = text.header;
    element.querySelector('.' + block + '__button').textContent = text.button;
    main.appendChild(element);
    document.addEventListener('keydown', onMessageEscPress); // закрывает сообщение по ecs
    document.addEventListener('click', clickOnScreen); // клик на произвольную область экрана
  };
  window.utils = {
    TemplateType: TemplateType,
    showMessage: showMessage,
    showModal: showModal,
    hideModal: hideModal,
  };
}());
