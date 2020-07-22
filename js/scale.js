'use strict';
(function () {
  var picturesWindow = document.querySelector('.pictures');
  var scaleControlFieldset = picturesWindow.querySelector('.img-upload__scale');
  var scaleSmallerButton = scaleControlFieldset.querySelector('.scale__control--smaller');
  var scaleBiggerButton = scaleControlFieldset.querySelector('.scale__control--bigger');
  var scaleControlInput = scaleControlFieldset.querySelector('.scale__control--value');
  var picturePreview = picturesWindow.querySelector('.img-upload__preview img');

  function onSmallerButtonClick() {
    var scale = Number(/\d+/.exec(scaleControlInput.value));
    if (scale - 25 >= 25) {
      scale = scale - 25;
      scaleControlInput.value = scale + '%';
      picturePreview.style.transform = 'scale' + '(' + scale / 100 + ')';
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
  function updateScale() {
    var scale = 100;
    scaleControlInput.value = scale + '%';
    picturePreview.style.transform = 'scale' + '(' + scale / 100 + ')';
  }

  scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onBiggerButtonClick);
  window.scale = {
    updateScale: updateScale
  };
}());
