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
  var cancelBigPhoto = bigWindow.querySelector('.big-picture__cancel'); // кнопка закрытия крестик
  var commentWriteField = bigWindow.querySelector('.social__footer-text'); // поле ввода коммента используется в esc

  // var arrow = window.data.arrowData;


  var getSocialComment = function (commentNumber, arr) {
    var socialCommentListElement = socialCommentTemplate.cloneNode(true);
    socialCommentListElement.querySelector('.social__picture').src = arr.comments[commentNumber].avatar;
    socialCommentListElement.querySelector('.social__picture').alt = arr.comments[commentNumber].name;
    socialCommentListElement.querySelector('.social__text').textContent = arr.comments[commentNumber].message;
    return socialCommentListElement;
  };

  function commentsRendering(min, max, arr) {
    var fragmentCommentBigPhoto = document.createDocumentFragment();
    var commentNumber = min;
    while (commentNumber < max) {
      fragmentCommentBigPhoto.appendChild(getSocialComment(commentNumber, arr));
      commentNumber++;
    }
    similarListElement.appendChild(fragmentCommentBigPhoto);
  }
  // функция загрузки комментов, т к это коллбек то не принимает инфу о номере текущей фотки, не смогла просто передать ей текущий элемент arr как в остальных функциях
  // приходится импровизировать,! если скажешь как сделать более удобно буду рада
  function onClickLoader() {
    var arrNumber = Number(/\d+(?=\.)/.exec(bigWindow.querySelector('.big-picture__img img').src));// номер нужного элемента в массиве data
    var arr = window.data[arrNumber - 1];// текущий элемент фото
    var arrCommentAmount = arr.comments.length; // полное количество комментов
    var alreadyRenderComments = similarListElement.querySelectorAll('.social__comment').length; // количество уже выведенных комментов
    var min = alreadyRenderComments;
    var max;
    if (arrCommentAmount - alreadyRenderComments < 5) {
      // console.log('коммитов осталось меньше пяти');
      max = arrCommentAmount;
      commentsLoader.classList.add('hidden');
    } else {
      // console.log('коммитов осталось больше либо равно пяти');
      max = alreadyRenderComments + 5;
    }
    commentsRendering(min, max, arr);
  }
  // создание фрагмента списка комментов к фотке и добавление его к нужному элементу окна
  var commentFragmentCreation = function (arr) {
    if (arr.comments.length < 5) {
      commentsRendering(0, arr.comments.length, arr);
    } else { // если комментов больше пяти
      commentsLoader.classList.remove('hidden');// показываем кнопку загрузить еще
      commentsRendering(0, 5, arr); // загружаем лишь пять первых комментов
      commentsLoader.addEventListener('click', onClickLoader); // по клику должны открыться по 5 комментов
    }
  };

  // функция заполняет информацией изображения: адрес, лайки комменты, описание в большое окно
  var bidPhotoCompilation = function (arr) {
    bigWindow.querySelector('.big-picture__img img').src = arr.url;
    bigWindow.querySelector('.likes-count').textContent = arr.likes;
    bigWindow.querySelector('.comments-count').textContent = arr.comments.length;
    bigWindow.querySelector('.social__caption').textContent = arr.description;
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigWindow.classList.remove('hidden');
    commentFragmentCreation(arr);
  };
  var onBigPhotoEscPress = function (evt) {
    if (evt.key === 'Escape' && evt.target !== commentWriteField) {
      evt.preventDefault();
      closeBigPhoto();
    }
  };
  var openBigPhotoHelp = function (elementSrc, arr) {
    var currentPhotoNumber = Number(/\d+(?=\.)/.exec(elementSrc)[0]);
    bidPhotoCompilation(arr[currentPhotoNumber - 1]);
    document.addEventListener('keydown', onBigPhotoEscPress);
  };
  // заполнение списка комментариев
  var openBigPhoto = function (evt, arr) {
    if (evt.target.src) {
      openBigPhotoHelp(evt.target.src, arr);
    }
  };
  var onEnterOpenBigPhoto = function (evt, arr) {
    if (evt.target.children[0].src) {
      openBigPhotoHelp(evt.target.children[0].src, arr);
    }
  };
  var closeBigPhoto = function () {
    bigWindow.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
    // удаление списка комментариев при закрытии фото
    var socialComments = similarListElement.children;
    // для комментов с кнопкой загрузки удаляем обработчик на кнопку
    if (socialComments.length > 5) {
      commentsLoader.removeEventListener('click', onClickLoader);
    }
    while (socialComments.length !== 0) {
      socialComments[socialComments.length - 1].remove();
    }
  };
  window.preview = function (data) {
    picturesWindow.addEventListener('click', function (evt) {
      openBigPhoto(evt, data);
    });
    document.addEventListener('keydown', function (evt) {
      if ((evt.key === 'Enter') && (evt.target.classList.contains('picture'))) {
        onEnterOpenBigPhoto(evt, data);
      }
    });
  };
  // обработчик клика по фотке, делает вывод большого изображения
  cancelBigPhoto.addEventListener('click', function () {
    closeBigPhoto();
  });

}());
