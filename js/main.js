'use strict';
(function () {
  window.load('https://javascript.pages.academy/kekstagram/data', function (data) {
    window.picture(data);
    window.preview(data);
  }, function (text, block) {
    window.utils.showMessage(text, block);
  });
})();
