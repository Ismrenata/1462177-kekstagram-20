'use strict';
(function () {
// отрисовка миниатюры фоток с количеством лайков и комментов
  var picturesTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');
  var picturesWindow = document.querySelector('.pictures');
  var arrow = window.data.arrowData;
  // функция создает элементы  каждой фотографии под порядковым номером number
  var getPhotos = function (number) {

    var photoElement = picturesTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = arrow[number].url;
    photoElement.querySelector('.picture__likes').textContent = arrow[number].likes;
    photoElement.querySelector('.picture__comments').textContent = arrow[number].comments.length;
    return photoElement;
  };
  // здесь через DocumentFragme хочу вставить в блок .pictures фотографии и описание
  var fragment = document.createDocumentFragment();
  for (var i = 1; i < 26; i++) {
    fragment.appendChild(getPhotos(i));
  }
  picturesWindow.appendChild(fragment);
  // пока не знаю зачем в глобольную область picturesWindow
  // window.picture = {
  //   pictureWindowFull: picturesWindow
  // };
}());
