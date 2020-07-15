'use strict';
(function () {
// отрисовка миниатюры фоток с количеством лайков и комментов
  var picturesTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');
  var picturesWindow = document.querySelector('.pictures');
  // функция создает элементы  каждой фотографии под порядковым номером number
  var filterButtons = document.querySelector('.img-filters');
  var defaultButton = filterButtons.querySelector('#filter-default');
  var randomButton = filterButtons.querySelector('#filter-random');
  var ratingCommentButton = filterButtons.querySelector('#filter-discussed');

  var getArr = function (arr) {
    var photoElement = picturesTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = arr.url;
    photoElement.querySelector('.picture__likes').textContent = arr.likes;
    photoElement.querySelector('.picture__comments').textContent = arr.comments.length;
    return photoElement;
  };

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
  function defaultRendering(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(getArr(data[i]));
    }
    picturesWindow.appendChild(fragment);
  }

  function getRank(arr) {
    return arr.comments.length;
  }
  function ratingCommentFilter() {
    var picturesElements = picturesWindow.querySelectorAll('.picture');
    for (var i = 0; i < picturesElements.length; i++) {
      picturesWindow.removeChild(picturesElements[i]);
    }
    var popularElements = window.data.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      return rankDiff;
    });
    defaultRendering(popularElements.slice(0, 10));
    removeClassButton(randomButton);
    removeClassButton(defaultButton);
    toggleClassButton(ratingCommentButton);
  }

  function defaultFilter() {
    var picturesElements = picturesWindow.querySelectorAll('.picture');
    for (var i = 0; i < picturesElements.length; i++) {
      picturesWindow.removeChild(picturesElements[i]);
    }
    defaultRendering(window.data);
    removeClassButton(randomButton);
    removeClassButton(ratingCommentButton);
    toggleClassButton(defaultButton);
  }

  function randomFilter() {
    var picturesElements = picturesWindow.querySelectorAll('.picture');
    if (!randomButton.classList.contains('img-filters__button--active')) {
      var arr = []; // записываем в этот массив рандомные числа
      var max = 10; // максимальная длина массива
      var rundomnumber; // случайное число

      while (arr.length < max) {
        rundomnumber = Math.floor(Math.random() * window.data.length); // создадим случайное число
        if (arr.indexOf(rundomnumber) === -1) { // проверим есть оно  у нас или нет
          arr.push(rundomnumber); // записываем в массив т.к нету
        }
      }
      for (var i = 0; i < arr.length; i++) {
        arr[i] = window.data[arr[i]];
      }
      if (defaultButton.classList.contains('img-filters__button--active')) {
        for (i = 0; i < window.data.length; i++) {
          if (!arr.includes(window.data[i])) {
            picturesWindow.removeChild(picturesElements[i]);
          }
        }
      } else {
        for (i = 0; i < picturesElements.length; i++) {
          picturesWindow.removeChild(picturesElements[i]);
        }
        defaultRendering(arr);
      }
      removeClassButton(defaultButton);
      removeClassButton(ratingCommentButton);
      toggleClassButton(randomButton);
    }
  }
  var onRandomClick = window.debounce(randomFilter);
  var onRatingCommentClick = window.debounce(ratingCommentFilter);
  var onDefaultClick = window.debounce(defaultFilter);
  randomButton.addEventListener('click', onRandomClick);
  defaultButton.addEventListener('click', onDefaultClick);
  ratingCommentButton.addEventListener('click', onRatingCommentClick);
  // var fragment = document.createDocumentFragment();
  // for (var i = 1; i < 26; i++) {
  //   fragment.appendChild(getPhotos(i));
  // }
  // picturesWindow.appendChild(fragment);
}());
