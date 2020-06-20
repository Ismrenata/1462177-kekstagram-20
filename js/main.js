'use strict';
(function () {
  var picturesTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesWindow = document.querySelector('.pictures');


  var messageRandom = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var nameAuthorsRandom = ['Апполон', 'Гера', 'Афродита', 'Гермес', 'Эрот', 'Афина'];

  // функция возвращает список комментариев для какой-нибудь фотографии

  var commentsGeneration = function () {
    var commentsEmpty = [];
    for (var i = 0; i <= Math.floor(Math.random() * 7); i++) {
      var object = {};
      object.avatar = 'img/avatar-' + (Math.floor(Math.random() * (nameAuthorsRandom.length - 1)) + 1) + '.svg';
      if (Math.floor(Math.random() * 2) === 1) {
        var message1 = messageRandom[Math.floor(Math.random() * (messageRandom.length - 1)) + 1];
        var message2 = messageRandom[Math.floor(Math.random() * (messageRandom.length - 1)) + 1];
        while (message1 === message2) {
          message2 = messageRandom[Math.floor(Math.random() * (messageRandom.length - 1)) + 1];
        }
        object.message = message1 + message2;
      } else {
        object.message = messageRandom[Math.floor(Math.random() * (messageRandom.length - 1)) + 1];
      }
      object.name = nameAuthorsRandom[Math.floor(Math.random() * (nameAuthorsRandom.length - 1)) + 1];
      commentsEmpty[i] = object;
    }
    return commentsEmpty;
  };
  // функция возвращает массив из  25 объектов, который нам нужен
  var objectGeneration = function () {
    var arrEmpty = [];
    for (var i = 1; i < 26; i++) {
      var object = {};
      object.url = 'photos/' + i + '.jpg';
      object.description = '';
      object.likes = Math.floor(Math.random() * (200 - 15)) + 15;
      object.comments = commentsGeneration();
      arrEmpty[i] = object;
    }
    return arrEmpty;
  };
  var arrow = objectGeneration();
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

  // для первого элемента вывод большого изображения

  var bigWindow = document.querySelector('.big-picture');
  var socialCommentTemplateContent = document.querySelector('#social__comment_template').content;
  var socialCommentTemplate = socialCommentTemplateContent.querySelector('.social__comment');
  var similarListElement = bigWindow.querySelector('.social__comments');
  var socialCommentCount = bigWindow.querySelector('.social__comment-count');
  var commentsLoader = bigWindow.querySelector('.comments-loader');

  // bigWindow.classList.remove('hidden');

  bigWindow.querySelector('.big-picture__img img').src = arrow[1].url;
  bigWindow.querySelector('.likes-count').textContent = arrow[1].likes;
  bigWindow.querySelector('.comments-count').textContent = arrow[1].comments.length;
  bigWindow.querySelector('.social__caption').textContent = arrow[1].description;

  var getSosialComment = function (commentNumber) {
    var socialCommentListElement = socialCommentTemplate.cloneNode(true);

    socialCommentListElement.querySelector('.social__picture').src = arrow[1].comments[commentNumber].avatar;
    socialCommentListElement.querySelector('.social__picture').alt = arrow[1].comments[commentNumber].name;
    socialCommentListElement.querySelector('.social__text').textContent = arrow[1].comments[commentNumber].message;
    return socialCommentListElement;
  };

  var fragmentCommentBigPhoto = document.createDocumentFragment();
  for (var commentNumber = 0; commentNumber < arrow[1].comments.length; commentNumber++) {
    fragmentCommentBigPhoto.appendChild(getSosialComment(commentNumber));
  }
  similarListElement.appendChild(fragmentCommentBigPhoto);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // дом задание лекция 4
  var uploadField = picturesWindow.querySelector('#upload-file');// поле выбора файла
  var uploadCansel = picturesWindow.querySelector('#upload-cancel');
  var editForm = picturesWindow.querySelector('.img-upload__overlay');

  var fieldsetEffectLevel = picturesWindow.querySelector('.img-upload__effect-level');
  var effectLevelSlider = fieldsetEffectLevel.querySelector('.effect-level__pin');// ползунок
  // var effectLevelLine = fieldsetEffectLevel.querySelector('.effect-level__depth');
  var effectLevelInput = fieldsetEffectLevel.querySelector('.effect-level__value');
  var fieldsetFilterList = picturesWindow.querySelector('.img-upload__effects');

  var fieldsetHashtag = picturesWindow.querySelector('.img-upload__text');
  var textHashtag = fieldsetHashtag.querySelector('.text__hashtags');
  var uploadSubmit = picturesWindow.querySelector('.img-upload__submit');
  var reg = new RegExp('^#[a-zA-Z0-9_]{1,20}$');
  var image = document.querySelector('.img-upload__preview');
  // var NULL_POSITION = 488;
  // var NULL_WIDTH = 20;
  var chosenEffect = 'none';

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };
  var openPopup = function () {
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    if (chosenEffect === 'none') {
      image.style.filter = '';
      fieldsetEffectLevel.classList.add('visually-hidden');
    }
  };

  var closePopup = function () {
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadField.value = ''; // сброс значения поля выбора
  };
  var effecs = {
    chrome: {
      filter: 'grayscale(1)',
      meaning: 1,
      effect: 'grayscale'
    },
    sepia: {
      filter: 'sepia(1)',
      meaning: 1,
      effect: 'sepia'
    },
    marvin: {
      filter: 'invert(100%)',
      meaning: 100,
      effect: 'invert'
    },
    phobos: {
      filter: 'blur(3px)',
      meaning: 3,
      effect: 'blur'
    },
    heat: {
      filter: 'brightness(3)',
      meaning: 3,
      effect: 'brightness'
    }
  };
  var computePosition = function () {
    var levelPosition = effecs[chosenEffect].meaning / 100 * effectLevelInput.value;
    image.style = 'color: red';
    if ((chosenEffect === 'marvin') || (chosenEffect === 'phobos')) {
      if (chosenEffect === 'marvin') {
        image.style = 'filter: ' + effecs[chosenEffect].effect + '(' + levelPosition + '%' + ')';
      }
      if (chosenEffect === 'phobos') {
        image.style = 'filter: ' + effecs[chosenEffect].effect + '(' + levelPosition + 'px' + ')';
      }
    } else {
      image.style = 'filter: ' + effecs[chosenEffect].effect + '(' + levelPosition + ')';
    }
    // var newWidth = e.clientX * NULL_WIDTH / NULL_POSITION;
    //   effectLevelSlider.style.left = newWidth + '%';
    //   effectLevelLine.style.width = newWidth + '%';
    //   effectLevelInput.value = newWidth;
    // координата по х отпускания мыши
  };
  var updateSliderPosition = function (evt) {
    chosenEffect = evt.target.value;

    if (chosenEffect === 'none') {
      image.style.filter = '';
      fieldsetEffectLevel.classList.add('visually-hidden');
    } else {
      fieldsetEffectLevel.classList.remove('visually-hidden');
      image.style = 'filter: ' + effecs[chosenEffect].filter;
    }
  };

  // uploadSubmit.addEventListener('click', function () {
  //   var hashtagLine = textHashtag.value;
  //   if (hashtagLine) {
  //     var hashtagArr = hashtagLine.toLowerCase().split(' ');

  //     for (var hash = 0; hash < hashtagArr.length; hash++) {
  //       if (/^#[a-zA-Z0-9_]{1,20}$/ig.test(hashtagArr[hash])) {
  //         var hashExamle = hashtagArr[hash];
  //         for (var k = hash + 1; k < hashtagArr.length; k++) {
  //           if (hashExamle === hashtagArr[k]) {
  //             textHashtag.setCustomValidity('Нельзя вводить один и тот же хештег!');
  //           } else {
  //             textHashtag.setCustomValidity('');
  //           }
  //         }
  //       } else {
  //         textHashtag.setCustomValidity('Некорректно введен хештег!');
  //       }
  //     }
  //     if (hashtagArr.length > 5) {
  //       textHashtag.setCustomValidity('Нельзя использовать более 5ти хештегов!');
  //     }

  //   }
  // });
  var checkHashtags = function () {
    var hashtagLine = textHashtag.value ? textHashtag.value : false;
    if (hashtagLine) {
      var hashtagArr = hashtagLine.toLowerCase().split(' ');
      var listOfErrors = {
        repeated: false,
        maxLimit: false,
        syntaxError: false
      };
      var uniqueTags = [];
      var mistakes = '';
      if (hashtagArr.length > 5) {
        listOfErrors.maxLimit = true;
      }
      for (var hash = 0; hash < hashtagArr.length; hash++) {
        if (!uniqueTags.includes(hashtagArr[hash])) {
          uniqueTags.push(hashtagArr[hash]);
        } else {
          listOfErrors.repeated = true;
        }
        if (!reg.test(hashtagArr[hash])) {
          listOfErrors.syntaxError = true;
        }
      }
      if (listOfErrors.repeated) {
        mistakes += 'теги повторяются! ';
      }
      if (listOfErrors.maxLimit) {
        mistakes += 'Нельзя использовать более 5ти хештегов!';
      }
      if (listOfErrors.syntaxError) {
        mistakes += 'Некорректно введен хештег!';
      }
      if (mistakes.length) {
        textHashtag.setCustomValidity(mistakes);
      }
    }
  };
  uploadField.addEventListener('change', function () {
    openPopup();
    editForm.classList.remove('hidden');
  });

  uploadCansel.addEventListener('click', function () {
    closePopup();
  });
  uploadField.addEventListener('change', function () {
    openPopup();
    editForm.classList.remove('hidden');
  });
  uploadSubmit.addEventListener('click', function (evt) {
    checkHashtags(evt);
  });
  // обработчик на радиокнопки (при изменении состояния возращает начальное положение )
  fieldsetFilterList.addEventListener('change', function (evt) {
    updateSliderPosition(evt);
    // нужно прописать для ползунка изменения и линии, но это потом, и думаю сейчас не нужно
  });

  effectLevelSlider.addEventListener('mouseup', function (evt) {
    computePosition(evt.pageX);
  });

}());
