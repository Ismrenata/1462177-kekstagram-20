'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var fieldsetHashtag = picturesWindow.querySelector('.img-upload__text');
  var textHashtag = fieldsetHashtag.querySelector('.text__hashtags');
  var reg = new RegExp('^#[a-zA-Z0-9_]{1,20}$');
  var uploadSubmit = picturesWindow.querySelector('.img-upload__submit'); // кнопка отправки формы
  // неправильно немного сделала надо там нужно перезатирать на пустое поле setCustomValidity('') --- позже сделаю
  window.hashValidation = {
    isHashIncorrect: function () {
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
    }
  };
  uploadSubmit.addEventListener('click', function (evt) {
    window.hashValidation.isHashIncorrect(evt);
  });
}());
