'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var fieldsetHashtag = picturesWindow.querySelector('.img-upload__text');
  var textHashtag = fieldsetHashtag.querySelector('.text__hashtags');
  var commentField = fieldsetHashtag.querySelector('.text__description');

  var isHashCorrect = function () {
    var reg = new RegExp('^#[a-zA-ZА-Яа-я0-9_]{1,20}');
    var hashtagLine = textHashtag.value ? textHashtag.value : false;
    if (hashtagLine) {
      var hashtagArr = hashtagLine.toLowerCase().split(' ').filter(function (element) {
        return element !== '';
      });
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
        mistakes += 'Теги повторяются! ';
      }
      if (listOfErrors.maxLimit) {
        mistakes += 'Нельзя использовать более 5ти хештегов!';
      }
      if (listOfErrors.syntaxError) {
        mistakes += 'Xэш-тег начинается с символа #, не может содержать пробелы, спецсимволы. Макс. длина 20 символов';
      }
      if (mistakes.length) {
        textHashtag.setCustomValidity(mistakes);
        textHashtag.classList.add('text__hashtags__warning');
      } else {
        textHashtag.setCustomValidity('');
        textHashtag.classList.remove('text__hashtags__warning');
      }
      return;
    }
    textHashtag.setCustomValidity('');
    textHashtag.classList.remove('text__hashtags__warning');
  };

  var isFormSubmit = function () {
    textHashtag.value = '';
    commentField.value = '';
  };
  window.hashValidate = {
    isHashCorrect: isHashCorrect,
    isFormSubmit: isFormSubmit
  };
}());

