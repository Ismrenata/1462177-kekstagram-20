'use strict';
(function () {
  // форма открытия и редактирования изображения

  var picturesWindow = document.querySelector('.pictures');

  var fieldsetFilterList = picturesWindow.querySelector('.img-upload__effects');
  var fieldsetEffectLevel = picturesWindow.querySelector('.img-upload__effect-level');

  var grayLineEffect = fieldsetEffectLevel.querySelector('.effect-level__line'); // серая линия
  var effectLevelSlider = grayLineEffect.querySelector('.effect-level__pin'); // ползунок
  var effectLevelLine = grayLineEffect.querySelector('.effect-level__depth'); // живая изменяющаяся линия
  var effectLevelInput = fieldsetEffectLevel.querySelector('.effect-level__value'); // значение самого эффекта
  var image = document.querySelector('.img-upload__preview img'); // изображение кота

  var nameEffects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
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

  var chosenEffect = 'none';

  window.form = {
    ifOriginalEffect: function () {
      if (chosenEffect === 'none') {
        image.style.filter = '';
        fieldsetEffectLevel.classList.add('visually-hidden');
      }
    },
    ifFormSubmit: function () {
      image.style = '';
      fieldsetEffectLevel.classList.add('visually-hidden');
      fieldsetFilterList.querySelector('#effect-none').checked = true;
    },
    inputValueMathFloor: function () {
      effectLevelInput.value = Math.floor(effectLevelInput.value);
    }
  };
  function changeFilterClass(chosen) {
    nameEffects.forEach(function (item, i, arr) {
      if (image.classList.contains('effects__preview--' + arr[i])) {
        image.classList.remove('effects__preview--' + arr[i]);
      }
    });
    image.classList.add('effects__preview--' + chosen);
  }
  var updateSliderPosition = function (evt) {
    chosenEffect = evt.target.value;
    changeFilterClass(chosenEffect);
    if (chosenEffect === 'none') {
      image.style.filter = '';
      fieldsetEffectLevel.classList.add('visually-hidden');
    } else {
      fieldsetEffectLevel.classList.remove('visually-hidden');
      image.style.filter = effecs[chosenEffect].filter;
      effectLevelSlider.style.left = '100%';
      effectLevelInput.value = 100;
      effectLevelLine.style.width = '100%';
    }
  };

  var computePosition = function (effectLevelInputValue) {
    var levelPosition = effecs[chosenEffect].meaning / 100 * effectLevelInputValue;
    image.style.color = 'red';
    if ((chosenEffect === 'marvin') || (chosenEffect === 'phobos')) {
      if (chosenEffect === 'marvin') {
        image.style.filter = effecs[chosenEffect].effect + '(' + levelPosition + '%' + ')';
      }
      if (chosenEffect === 'phobos') {
        image.style.filter = effecs[chosenEffect].effect + '(' + levelPosition + 'px' + ')';
      }
    } else {
      if (chosenEffect === 'heat') {
        levelPosition = 1 + (effecs[chosenEffect].meaning - 1) / 100 * effectLevelInputValue;
      }
      image.style.filter = effecs[chosenEffect].effect + '(' + levelPosition + ')';
    }
  };
  // обработчик на радиокнопки (при изменении состояния возращает начальное положение )
  fieldsetFilterList.addEventListener('change', function (evt) {
    updateSliderPosition(evt);
  });
  // Внизу код для движения пина и изменения эффекта
  effectLevelSlider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var onePersent = grayLineEffect.getBoundingClientRect().width / 100; // 1 % ширины в пикселях
    var startCoords = {
      x: evt.clientX,
      xLineValue: effectLevelInput.value // значение поля эффекта просто в цифрах, начальное 100 стоит
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        xLineValue: (startCoords.x - moveEvt.clientX) / onePersent
      };
      if (((startCoords.xLineValue >= 0) && (startCoords.xLineValue <= 100)) || ((startCoords.xLineValue > 100) && (shift.x > 0)) || ((startCoords.xLineValue < 0) && (shift.x < 0))) {
        effectLevelSlider.style.left = (effectLevelSlider.offsetLeft - shift.x) + 'px';
        effectLevelInput.value = effectLevelInput.value - shift.xLineValue;
        effectLevelLine.style.width = effectLevelInput.value + '%';


        startCoords = {
          x: moveEvt.clientX,
          xLineValue: effectLevelInput.value
        };
      }
      if (startCoords.xLineValue < 0) {
        effectLevelSlider.style.left = '0%';
        effectLevelInput.value = 0;
        effectLevelLine.style.width = '0%';
      }
      if (startCoords.xLineValue > 100) {
        effectLevelSlider.style.left = '100%';
        effectLevelInput.value = 100;
        effectLevelLine.style.width = '100%';
      }
      computePosition(effectLevelInput.value);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

}());
