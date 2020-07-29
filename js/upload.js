'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(window.textMessage.success(), window.utils.TemplateType.SUCCESS);
      } else {
        onError(window.textMessage.error(), window.utils.TemplateType.ERROR);
      }
    });

    xhr.addEventListener('error', function () {
      onError(window.textMessage.disconnect(), window.utils.TemplateType.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(window.textMessage.timeout(xhr), window.utils.TemplateType.ERROR);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
