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

  // var arrow = window.data.arrowData;


  var getSosialComment = function (commentnumber, arr) {
    var socialCommentListElement = socialCommentTemplate.cloneNode(true);
    socialCommentListElement.querySelector('.social__picture').src = arr.comments[commentnumber].avatar;
    socialCommentListElement.querySelector('.social__picture').alt = arr.comments[commentnumber].name;
    socialCommentListElement.querySelector('.social__text').textContent = arr.comments[commentnumber].message;
    return socialCommentListElement;
  };

  function commentsRendering(min, max, arr) {
    var fragmentCommentBigPhoto = document.createDocumentFragment();
    var commentNumber = Number(min);
    while (commentNumber < Number(max)) {
      fragmentCommentBigPhoto.appendChild(getSosialComment(commentNumber, arr));
      commentNumber++;
    }
    similarListElement.appendChild(fragmentCommentBigPhoto);
  }
  // функция загрузки комментов, т к это коллбек то не принимает инфу о номере текущей фотки, не смогла просто передать ей текущий элемент arr как в остальных функциях
  // приходится импровизировать,! если скажешь как сделать более удобно буду рада
  function onClickLoader() {
    var arrNumber = Number(/\d+(?=\.)/.exec(bigWindow.querySelector('.big-picture__img img').src));// номер нужного элемента в массиве data
    var arr = window.data[arrNumber - 1].comments;// текущий список комментов весь
    var arrCommentAmount = arr.length; // полное количество комментов
    var alreadyRenderComments = similarListElement.querySelectorAll('.social__comment').length; // количество уже выведенных комментов
    var min = alreadyRenderComments;
    var max;
    if (arrCommentAmount - alreadyRenderComments < 5) {
      // console.log('коммитов осталось меньше пяти');
      max = arrCommentAmount;
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
  var bidPhotoCompilation = function (evt, arr) {
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

  // заполнение списка комментариев
  var openBigPhoto = function (evt, arr) {
    if (evt.target.src) {
      var currentPhotoNumber = Number(/\d+(?=\.)/.exec(evt.target.src)[0]);
      bidPhotoCompilation(evt, arr[currentPhotoNumber - 1]);
      document.addEventListener('keydown', onBigPhotoEscPress);
      // console.log(data[currentPhotoNumber - 1]);
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
    for (var l = 0; l < photosArray.length; l++) {
      photosArray[l].addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          openBigPhoto(evt, data);
        }
      });
    }
  };
  // обработчик клика по фотке, делает вывод большого изображения
  canselBigPhoto.addEventListener('click', function () {
    closeBigPhoto();
  });

}());
