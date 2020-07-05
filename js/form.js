'use strict';
(function () {
  // форма редактирования изображения
  var picturesWindow = document.querySelector('.pictures');
  var fieldsetEffectLevel = picturesWindow.querySelector('.img-upload__effect-level');
  // var effectLevelSlider = fieldsetEffectLevel.querySelector('.effect-level__pin'); // ползунок
  // var effectLevelLine = fieldsetEffectLevel.querySelector('.effect-level__depth');
  var effectLevelInput = fieldsetEffectLevel.querySelector('.effect-level__value');

  var image = document.querySelector('.img-upload__preview');
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
  // var NULL_POSITION = 488;
  // var NULL_WIDTH = 20;
  var chosenEffect = 'none';
  window.form = {
    ifOriginalEffect: function () {
      if (chosenEffect === 'none') {
        image.style.filter = '';
        fieldsetEffectLevel.classList.add('visually-hidden');
      }
    },
    computePosition: function () {
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
    },
    updateSliderPosition: function (evt) {
      chosenEffect = evt.target.value;

      if (chosenEffect === 'none') {
        image.style.filter = '';
        fieldsetEffectLevel.classList.add('visually-hidden');
      } else {
        fieldsetEffectLevel.classList.remove('visually-hidden');
        image.style = 'filter: ' + effecs[chosenEffect].filter;
      }
    }
  // var newWidth = e.clientX * NULL_WIDTH / NULL_POSITION;
  //   effectLevelSlider.style.left = newWidth + '%';
  //   effectLevelLine.style.width = newWidth + '%';
  //   effectLevelInput.value = newWidth;
  // координата по х отпускания мыши
  };


}());
