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
    return arr.comments.length;
  }

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
        arr.push(rundomnumber); // записываем в массив т.к нету
      }
    }
    for (var i = 0; i < arr.length; i++) {
      arr[i] = window.data[arr[i]];
    }
    // код ниже позволяет частично перерендаривать после клика
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

  function filterFunction(butt1, butt2, buttoncurrent) {
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
      defaultRendering(arrow);
      removeClassButton(butt1);
      removeClassButton(butt2);
      toggleClassButton(buttoncurrent);
    }
  }
  function button1() {
    filterFunction(randomButton, ratingCommentButton, defaultButton);
  }
  function button2() {
    filterFunction(defaultButton, ratingCommentButton, randomButton);
  }
  function button3() {
    filterFunction(defaultButton, randomButton, ratingCommentButton);
  }
  var onRandomClick = window.debounce(button2);
  var onRatingCommentClick = window.debounce(button3);
  var onDefaultClick = window.debounce(button1);
  randomButton.addEventListener('click', onRandomClick);
  defaultButton.addEventListener('click', onDefaultClick);
  ratingCommentButton.addEventListener('click', onRatingCommentClick);
}());


