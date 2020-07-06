'use strict';
(function () {
// отрисовка большого изображения, его открытие при клике и закрытие
  var bigWindow = document.querySelector('.big-picture');
  var picturesImages = document.querySelectorAll('.picture');
  var socialCommentTemplateContent = document.querySelector('#social__comment_template').content;
  var socialCommentTemplate = socialCommentTemplateContent.querySelector('.social__comment');
  var similarListElement = bigWindow.querySelector('.social__comments');
  var socialCommentCount = bigWindow.querySelector('.social__comment-count'); // используется, чтобы добавить класс hidden
  var commentsLoader = bigWindow.querySelector('.comments-loader'); // используется, чтобы добавить класс hidden
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
  var bidPhotoCompilation = function (currentPhotoNumber) {
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
  var openBigPhoto = function (target) {
    var currentPhotoNumber = Number(/\d+(?=\.)/.exec(target.src)[0]);
    bidPhotoCompilation(currentPhotoNumber);
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
  // обработчик клика по фотке, делает вывод большого изображения
  for (var image = 0; image < picturesImages.length; image++) {
    picturesImages[image].addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      switch (target.tagName) {
        case 'A':
          target = evt.target.querySelector('.picture__img');
          break;
        case 'P':
          target = evt.target.parentElement.querySelector('.picture__img');
          break;
        case 'SPAN':
          target = evt.target.parentElement.parentElement.querySelector('.picture__img');
          break;
      }
      openBigPhoto(target);
    });
  }
  canselBigPhoto.addEventListener('click', function () {
    closeBigPhoto();
  });
}());
