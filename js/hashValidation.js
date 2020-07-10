'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var fieldsetHashtag = picturesWindow.querySelector('.img-upload__text');
  var textHashtag = fieldsetHashtag.querySelector('.text__hashtags');

  var isHashIncorrect = function () {
    var reg = new RegExp('^#[a-zA-Z0-9_]{1,20}$');
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
      } else {
        textHashtag.setCustomValidity('');
      }
    }
  };
  window.hashValidation = {
    isHashIncorrect: isHashIncorrect
  };
}());

