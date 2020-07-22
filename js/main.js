'use strict';
(function () {
  window.toggleModal();
  window.load('https://javascript.pages.academy/kekstagram/data', function (data) {
    window.picture(data);
    window.preview(data);
  }, function () {});
})();
