'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var scaleControlFieldset = picturesWindow.querySelector('.img-upload__scale');
  var scaleSmallerButton = scaleControlFieldset.querySelector('.scale__control--smaller');
  var scaleBiggerButton = scaleControlFieldset.querySelector('.scale__control--bigger');
  var scaleControlInput = scaleControlFieldset.querySelector('.scale__control--value');
  var picturePreview = picturesWindow.querySelector('.img-upload__preview');

  function onSmallerButtonClick() {
    var value = Number(/\d+/.exec(scaleControlInput.value));
    if (value - 25 >= 25) {
      value = value - 25;
      scaleControlInput.value = value + '%';
      picturePreview.style.transform = 'scale' + '(' + value / 100 + ')';
    }
  }
  function onBiggerButtonClick() {
    var value = Number(/\d+/.exec(scaleControlInput.value));
    if (value + 25 <= 100) {
      value = value + 25;
      scaleControlInput.value = value + '%';
      picturePreview.style.transform = 'scale' + '(' + value / 100 + ')';
    }
  }
  scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onBiggerButtonClick);

}());
