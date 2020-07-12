'use strict';
(function () {
// отрисовка миниатюры фоток с количеством лайков и комментов
  var picturesTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');
  var picturesWindow = document.querySelector('.pictures');
  // функция создает элементы  каждой фотографии под порядковым номером number

  var getArr = function (arr) {
    var photoElement = picturesTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = arr.url;
    photoElement.querySelector('.picture__likes').textContent = arr.likes;
    photoElement.querySelector('.picture__comments').textContent = arr.comments.length;
    return photoElement;
  };

  window.picture = function (data) {
    // var dataCopy = data;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(getArr(data[i]));
    }

    picturesWindow.appendChild(fragment);
  };

  // var fragment = document.createDocumentFragment();
  // for (var i = 1; i < 26; i++) {
  //   fragment.appendChild(getPhotos(i));
  // }
  // picturesWindow.appendChild(fragment);
}());
