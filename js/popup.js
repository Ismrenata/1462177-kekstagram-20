'use strict';
(function () {
  var body = document.querySelector('body');
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };
  var openPopup = function (addActions) {
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    // все что ниже в функцию
    window.form.ifOriginalEffect();
    addActions();
  };
  var closePopup = function (addActions) {
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    addActions();
  };
  window.popup = {
    open: openPopup,
    close: closePopup
  };
}());
