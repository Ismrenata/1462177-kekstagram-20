'use strict';
var picturesTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');
var picturesWindow = document.querySelector('.pictures');

var messageRandom = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var nameAuthorsRandom = ['Апполон', 'Гера', 'Афродита', 'Гермес', 'Эрот', 'Афина'];

// функция возвращает список комментариев для какой-нибудь фотографии
var commentsGeneration = function (commentsEmpty) {
  for (var i = 0; i <= Math.floor(Math.random() * 7); i++) {
    var object = {};
    object.avatar = '"img/avatar-' + (Math.floor(Math.random() * (6 - 1)) + 1) + '.svg"';
    object.message = messageRandom[Math.floor(Math.random() * (6 - 1)) + 1];
    object.name = nameAuthorsRandom[Math.floor(Math.random() * (6 - 1)) + 1];
    commentsEmpty[i] = object;
  }
  return commentsEmpty;
};
// функция возвращает массив из  25 объектов, который нам нужен
var objectGeneration = function (arrEmpty) {

  for (var i = 0; i < 25; i++) {
    var object = {};
    object.url = 'photos/' + i + '.jpg';
    object.description = '';
    object.likes = Math.floor(Math.random() * (200 - 15)) + 15;
    object.comments = commentsGeneration([]);
    arrEmpty[i] = object;
  }
  return arrEmpty;
};

// функция создает элементы  каждой фотографии под порядковым номером number
var getPhotos = function (number) {
  var arrow = objectGeneration([]);
  var photoElement = picturesTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = arrow[number].url;
  photoElement.querySelector('.picture__likes').textContent = arrow[number].likes;
  photoElement.querySelector('.picture__comments').textContent = arrow[number].comments.length;
  return photoElement;
};
// здесь через DocumentFragme хочу вставить в блок .pictures фотографии и описание
var fragment = document.createDocumentFragment();
for (var i = 0; i < 25; i++) {
  fragment.appendChild(getPhotos(i));
}
picturesWindow.appendChild(fragment);
