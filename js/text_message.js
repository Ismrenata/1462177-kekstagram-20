'use strict';
(function () {
  window.textMessage = {
    disconnect: function () {
      return {
        button: 'Попробовать снова',
        header: 'Произошла ошибка соединения'
      };
    },
    timeout: function (xhr) {
      return {
        button: 'Попробовать снова',
        header: 'Запрос не успел выполниться за ' + xhr.timeout + 'мс'
      };
    },
    error: function () {
      return {
        button: 'Загрузить другой файл',
        header: 'Ошибка загрузки файла'
      };
    },
    success: function () {
      return {
        button: 'Круто!',
        header: 'данные успешно загружены'
      };
    }
  };
}());
