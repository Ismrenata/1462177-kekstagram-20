'use strict';
(function () {
  // блок отправки формы, проверки валидации и вывода сообщений об отправки
  var body = document.querySelector('body');
  var main = body.querySelector('main');// тег main для вывода сообщений об отправки формы
  var picturesWindow = document.querySelector('.pictures');
  var editForm = picturesWindow.querySelector('.img-upload__overlay');
  var uploadField = picturesWindow.querySelector('#upload-file'); // поле выбора файла

  var chooseMessage = function () {
    var message;
    if (main.contains(main.querySelector('.success'))) {
      message = main.querySelector('.success');
    } else {
      message = main.querySelector('.error');
    }
    return message;
  };
  var onMessage = function (classname) {
    var messageTemplate = document.querySelector(classname).content;
    var element = messageTemplate.cloneNode(true);
    main.appendChild(element);
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var message = chooseMessage();
      // если один из обработчиков сработает удаляем другие
      message.querySelector('button').removeEventListener('click', clickOnButton);
      document.removeEventListener('click', clickOnScreen);
      // document.removeEventListener('keydown', onMessageEscPress);
      main.removeChild(message);
    }
  };

  var clickOnButton = function (evt) {
    var element = evt.target.parentNode.parentNode;
    document.removeEventListener('click', clickOnScreen);
    document.removeEventListener('keydown', onMessageEscPress);
    main.removeChild(element);

  };
  var clickOnScreen = function () {
    var element = chooseMessage();
    element.querySelector('button').removeEventListener('click', clickOnButton);
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', clickOnScreen);
    main.removeChild(element);
  };
  var onSubmit = function (classname) {
    if (classname === 'success') {
      window.form.ifFormSubmitandClose();
      window.scale.updateScale();
      window.hashValidate.ifFormSubmit();
    }
    body.classList.remove('modal-open');
    editForm.classList.add('hidden');
    onMessage('#' + classname);
    var message = main.querySelector('.' + classname);
    document.addEventListener('keydown', onMessageEscPress); // закрывает сообщение по ecs
    document.addEventListener('click', clickOnScreen); // клик на произвольную область экрана
    message.querySelector('button').addEventListener('click', clickOnButton);
    uploadField.value = ''; // сброс значения поля выбора
  };
  window.sendForm = function (form) {
    window.upload(new FormData(form), function () {
      onSubmit('success');
    }, function () {
      onSubmit('error');
    });
  };
}());
