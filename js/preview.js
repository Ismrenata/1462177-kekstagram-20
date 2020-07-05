'use strict';
(function () {
// отрисовка большого изображения, его открытие при клике и закрытие
  var picturesWindow = document.querySelector('.pictures');// ?

  var bigWindow = document.querySelector('.big-picture');
  var socialCommentTemplateContent = document.querySelector('#social__comment_template').content;
  var socialCommentTemplate = socialCommentTemplateContent.querySelector('.social__comment');
  var similarListElement = bigWindow.querySelector('.social__comments');

  var socialCommentCount = bigWindow.querySelector('.social__comment-count'); // используется, чтобы добавить класс hidden
  var commentsLoader = bigWindow.querySelector('.comments-loader'); // используется, чтобы добавить класс hidden
  var photosArray = picturesWindow.querySelectorAll('.picture__img'); // для открытия по enter с клавиатуры
  var canselBigPhoto = bigWindow.querySelector('.big-picture__cancel'); // кнопка закрытия крестик
  var commentWriteField = bigWindow.querySelector('.social__footer-text'); // поле ввода коммента используется в esc

  var arrow = window.data.arrowData;


  var getSosialComment = function (commentNumber, currentPhotoNumber) {
    var socialCommentListElement = socialCommentTemplate.cloneNode(true);
    socialCommentListElement.querySelector('.social__picture').src = arrow[currentPhotoNumber].comments[commentNumber].avatar;
    socialCommentListElement.querySelector('.social__picture').alt = arrow[currentPhotoNumber].comments[commentNumber].name;
    socialCommentListElement.querySelector('.social__text').textContent = arrow[currentPhotoNumber].comments[commentNumber].message;
    return socialCommentListElement;
  };
  // создание фрагмента списка комментов к фотке и добавление его к нужному элементу окна
  var commentFragmentCreation = function (currentPhotoNumber) {
    var fragmentCommentBigPhoto = document.createDocumentFragment();
    for (var commentNumber = 0; commentNumber < arrow[currentPhotoNumber].comments.length; commentNumber++) {
      fragmentCommentBigPhoto.appendChild(getSosialComment(commentNumber, currentPhotoNumber));
    }
    similarListElement.appendChild(fragmentCommentBigPhoto);

  };

  // функция заполняет информацией изображения: адрес, лайки комменты, описание в большое окно
  var bidPhotoCompilation = function (evt, currentPhotoNumber) {
    bigWindow.querySelector('.big-picture__img img').src = arrow[currentPhotoNumber].url;
    bigWindow.querySelector('.likes-count').textContent = arrow[currentPhotoNumber].likes;
    bigWindow.querySelector('.comments-count').textContent = arrow[currentPhotoNumber].comments.length;
    bigWindow.querySelector('.social__caption').textContent = arrow[currentPhotoNumber].description;
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigWindow.classList.remove('hidden');

    commentFragmentCreation(currentPhotoNumber);
  };
  var onBigPhotoEscPress = function (evt) {
    if (evt.key === 'Escape' && evt.target !== commentWriteField) {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  // заполнение списка комментариев
  var openBigPhoto = function (evt) {
    var currentPhotoNumber = Number(/\d+(?=\.)/.exec(evt.target.src)[0]);
    bidPhotoCompilation(evt, currentPhotoNumber);
    document.addEventListener('keydown', onBigPhotoEscPress);
  };
  var closeBigPhoto = function () {
    bigWindow.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
    // удаление списка комментариев при закрытии фото
    var socialComments = similarListElement.children;
    while (socialComments.length !== 0) {
      socialComments[socialComments.length - 1].remove();
    }
  };
  // хотела сделать открытие по ENTer, еще не поняла раотает ли или нет
  for (var l = 0; l < photosArray.length; l++) {
    photosArray[l].addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        openBigPhoto(evt);
      }
    });
  }

  // обработчик клика по фотке, делает вывод большого изображения
  picturesWindow.addEventListener('click', function (evt) {
    openBigPhoto(evt);

  });

  canselBigPhoto.addEventListener('click', function () {
    closeBigPhoto();
  });

}());