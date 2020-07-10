'use strict';
(function () {
  // var onError = function (message) {
  //   console.error(message);
  // };

  // var onSuccess = function (data) {
  //   console.log(data);
  // };
  window.load('https://javascript.pages.academy/kekstagram/data', function (data) {
    window.picture(data);
    window.preview(data);
  }, function () {});
}());
