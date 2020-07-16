'use strict';
(function () {
// отрисовка миниатюры фоток с количеством лайков и комментов на главной
// основаная функция получает на вход данные либо моковые( в комменты поместила) либо реальные
  var picturesTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');
  var picturesWindow = document.querySelector('.pictures');
  // функция создает элементы  каждой фотографии под порядковым номером number
  var filterButtons = document.querySelector('.img-filters');
  var defaultButton = filterButtons.querySelector('#filter-default');
  var randomButton = filterButtons.querySelector('#filter-random');
  var ratingCommentButton = filterButtons.querySelector('#filter-discussed');

  function getArr(arr) {
    var photoElement = picturesTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = arr.url;
    photoElement.querySelector('.picture__likes').textContent = arr.likes;
    photoElement.querySelector('.picture__comments').textContent = arr.comments.length;
    return photoElement;
  }
  // рендеринг по дефолту
  function defaultRendering(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(getArr(data[i]));
    }
    picturesWindow.appendChild(fragment);
  }

  window.picture = function (data) {
    window.data = data;
    filterButtons.classList.remove('img-filters--inactive');
    defaultRendering(window.data);
  };


  function removeClassButton(button) {
    if (button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  }
  function toggleClassButton(button) {
    button.classList.toggle('img-filters__button--active');
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
    var rundomnumber; // случайное число

    while (arr.length < max) {
      rundomnumber = Math.floor(Math.random() * window.data.length); // создадим случайное число
      if (arr.indexOf(rundomnumber) === -1) { // проверим есть оно  у нас или нет
        arr.push(rundomnumber); // записываем в массив если нет
      }
    }
    for (var i = 0; i < arr.length; i++) {
      arr[i] = window.data[arr[i]]; // создаем свой массив изобъектов для рендеринга
    }
    // код ниже позволяет частично перерендаривать после клика (НЕ БУДУ УДАЛЯТЬ ПОКА)
    // if (defaultButton.classList.contains('img-filters__button--active')) {
    //   for (i = 0; i < window.data.length; i++) {
    //     if (!arr.includes(window.data[i])) {
    //       picturesWindow.removeChild(picturesElements[i]);
    //     }
    //   }
    // } else {
    //   for (i = 0; i < picturesElements.length; i++) {
    //     picturesWindow.removeChild(picturesElements[i]);
    //   }
    //   defaultRendering(arr);
    // }
    return arr;
  }

  function filterFunction(one, two, buttoncurrent) {
    if (!buttoncurrent.classList.contains('img-filters__button--active')) {
      var picturesElements = picturesWindow.querySelectorAll('.picture');
      for (var i = 0; i < picturesElements.length; i++) {
        picturesWindow.removeChild(picturesElements[i]);
      }
      var arrow;
      switch (buttoncurrent) {
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
      removeClassButton(one);
      removeClassButton(two);
      toggleClassButton(buttoncurrent); // переключение класса у кнопки клика
    }
  }

  // функции рендеринга для колбеков в функции дребезга
  function buttonDefaultRendering() {
    filterFunction(randomButton, ratingCommentButton, defaultButton);
  }
  function buttonRandomRendering() {
    filterFunction(defaultButton, ratingCommentButton, randomButton);
  }
  function buttonRatingRendering() {
    filterFunction(defaultButton, randomButton, ratingCommentButton);
  }

  // колбеки для функции вывода дребезга
  var onDefaultClick = window.debounce(buttonDefaultRendering);
  var onRandomClick = window.debounce(buttonRandomRendering);
  var onRatingCommentClick = window.debounce(buttonRatingRendering);

  // обработчки на кнопки клика
  defaultButton.addEventListener('click', onDefaultClick);
  randomButton.addEventListener('click', onRandomClick);
  ratingCommentButton.addEventListener('click', onRatingCommentClick);
}());


