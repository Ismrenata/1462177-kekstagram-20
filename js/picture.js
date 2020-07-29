'use strict';
(function () {
// отрисовка миниатюры фоток с количеством лайков и комментов на главной
// основаная функция получает на вход данные либо моковые( в комменты поместила) либо реальные
  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesWindow = document.querySelector('.pictures');
  // функция создает элементы  каждой фотографии под порядковым номером number
  var filterButtons = document.querySelector('.img-filters');
  var defaultButton = filterButtons.querySelector('#filter-default');
  var randomButton = filterButtons.querySelector('#filter-random');
  var ratingCommentButton = filterButtons.querySelector('#filter-discussed');
  var imgFilterSwitch = document.querySelector('.img-filters');
  var buttons = imgFilterSwitch.querySelectorAll('button');

  function getArr(element) {
    var photoElement = picturesTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = element.url;
    photoElement.querySelector('.picture__likes').textContent = element.likes;
    photoElement.querySelector('.picture__comments').textContent = element.comments.length;
    return photoElement;
  }
  // рендеринг по дефолту
  function defaultRendering(data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      fragment.appendChild(getArr(item));
    });
    picturesWindow.appendChild(fragment);
  }

  window.picture = function (data) {
    window.data = data;
    filterButtons.classList.remove('img-filters--inactive');
    defaultRendering(window.data);
  };
  function toggleClassButton(activeButton) {
    Array.from(buttons).forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    activeButton.classList.add('img-filters__button--active');
  }
  function getRank(arr) {
    return arr.comments.length; // функция рентинга - числа комментов
  }

  // функции внизу генерируют нужных массив объектов для каждой кнопки
  function ratingCommentFilter() {
    var popularElements = window.data.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      return rankDiff;
    });
    return popularElements.slice(0, 10);
  }

  function randomFilter() {
    var arr = []; // записываем в этот массив рандомные числа
    var max = 10; // максимальная длина массива
    var randomNumber; // случайное число

    while (arr.length < max) {
      randomNumber = Math.floor(Math.random() * window.data.length); // создадим случайное число
      if (arr.indexOf(randomNumber) === -1) { // проверим есть оно  у нас или нет
        arr.push(randomNumber); // записываем в массив если нет
      }
    }
    for (var i = 0; i < arr.length; i++) {
      arr[i] = window.data[arr[i]];// создаем свой массив изобъектов для рендеринга
    }
    return arr;
  }

  var filterFunction = function (currentButton) {
    if (!currentButton.classList.contains('img-filters__button--active')) {
      var picturesElements = picturesWindow.querySelectorAll('.picture');
      picturesElements.forEach(function (item) {
        picturesWindow.removeChild(item);
      });
      var arrow;
      switch (currentButton) {
        case randomButton:
          arrow = randomFilter();
          break;
        case ratingCommentButton:
          arrow = ratingCommentFilter();
          break;
        case defaultButton:
          arrow = window.data;
          break;
        default:
          break;
      }
      defaultRendering(arrow); // рендеринг нужного массива
      toggleClassButton(currentButton); // переключение класса у кнопки клика
    }
  };
  imgFilterSwitch.addEventListener('click', function (evt) {
    window.debounce(function () {
      filterFunction(evt.target);
    });
  });

}());


