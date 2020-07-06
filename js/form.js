'use strict';
(function () {
  // форма редактирования изображения
  var picturesWindow = document.querySelector('.pictures');
  var fieldsetEffectLevel = picturesWindow.querySelector('.img-upload__effect-level');
  // var effectLevelLine = fieldsetEffectLevel.querySelector('.effect-level__depth');
  var effectLevelInput = fieldsetEffectLevel.querySelector('.effect-level__value');
  var effectLevelSlider = fieldsetEffectLevel.querySelector('.effect-level__pin'); // ползунок
  var uploadSubmit = picturesWindow.querySelector('.img-upload__submit'); // кнопка отправки формы
  var uploadField = picturesWindow.querySelector('#upload-file');// поле выбора файла
  var uploadCansel = picturesWindow.querySelector('#upload-cancel');
  var editForm = picturesWindow.querySelector('.img-upload__overlay');
  var fieldsetFilterList = picturesWindow.querySelector('.img-upload__effects');

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
  var openPopup = function () {
    window.popup.open(function () {
      window.form.ifOriginalEffect();
    });
  };

  var closePopup = function () {
    window.popup.close(function () {
      editForm.classList.add('hidden');
      uploadField.value = '';
    }
    );
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
  uploadField.addEventListener('change', function () {
    openPopup();
    editForm.classList.remove('hidden');
  });

  uploadCansel.addEventListener('click', function () {
    closePopup();

  });
  effectLevelSlider.addEventListener('mouseup', function (evt) {
    computePosition(evt.pageX);
  });
  uploadSubmit.addEventListener('click', function () {
    window.hashValidation.isHashIncorrect();
  });
  // обработчик на радиокнопки (при изменении состояния возращает начальное положение )
  fieldsetFilterList.addEventListener('change', function (evt) {
    window.form.updateSliderPosition(evt);
    // нужно прописать для ползунка изменения и линии, но это потом, и думаю сейчас не нужно
  });

  effectLevelSlider.addEventListener('mouseup', function (evt) {
    window.form.computePosition(evt.pageX);
  });
  window.form = {
    ifOriginalEffect: function () {
      if (chosenEffect === 'none') {
        image.style.filter = '';
        fieldsetEffectLevel.classList.add('visually-hidden');
      }
    },
    computePosition: computePosition,
    updateSliderPosition: updateSliderPosition
  };
}());
