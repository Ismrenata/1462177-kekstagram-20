'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var fieldsetHashtag = picturesWindow.querySelector('.img-upload__text');
  var textHashtag = fieldsetHashtag.querySelector('.text__hashtags');
  var commentField = fieldsetHashtag.querySelector('.text__description');

  var reg2 = new RegExp('^#[a-zA-ZА-Яа-я0-9_]{1,20} ?$');
  function clearSetCustomValidity() {
    textHashtag.setCustomValidity('');
    textHashtag.classList.remove('text__hashtags__warning');
  }
  var checkInput = function () {
    if ((textHashtag.value === '') || (reg2.test(textHashtag.value))) {
      textHashtag.setCustomValidity('');
      textHashtag.classList.remove('text__hashtags__warning');
    } else {
      setTimeout(clearSetCustomValidity, 15000);
    }
  };

  textHashtag.addEventListener('input', checkInput);

  var isHashIncorrect = function () {
    var reg = new RegExp('^#[a-zA-ZА-Яа-я0-9_]{1,20}$');
    var hashtagLine = textHashtag.value ? textHashtag.value : false;
    var isHashСorrect = true;
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
        mistakes += 'Некорректно введен хештег! или Хештег слишком длинные!';
      }
      if (mistakes.length) {
        textHashtag.setCustomValidity(mistakes);
        textHashtag.classList.add('text__hashtags__warning');
        isHashСorrect = false;
      } else {
        textHashtag.setCustomValidity('');
        textHashtag.classList.remove('text__hashtags__warning');
        isHashСorrect = true;
      }
    }

    return isHashСorrect;
  };

  var ifFormSubmit = function () {
    textHashtag.value = '';
    commentField.value = '';
  };
  window.hashValidation = {
    isHashIncorrect: isHashIncorrect,
    ifFormSubmit: ifFormSubmit
  };
}());

