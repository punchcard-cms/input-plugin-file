'use strict';

/**
 * Validation for File Input Plugin
 *
 * @param {Object} input - inputs in this plugin's instance and their values as {String}
 * @param {Object} input.target - the triggering input's name and value as {String}
 * @param {String} input.target.name - the triggering input's name
 * @param {String|Bool} input.target.value - the triggering input's value
 * @param {Object} input.all - all inputs in this plugin's instance
 * @param {String|Bool} input.all.selectsRelated - value of input selectsRelated
 * @param {Object} [settings] - settings for this input plugin instance
 * @param {Object} [settings.target] - the triggering input's settings as an {Object}
 * @param {Object} [settings.all] - all settings in this plugin instance as an {Object}
 * @param {Object} [settings.all.selectsRelated] - settings of input selectsRelated {Object}
 *
 * @returns {Bool|String} true or a string with the text describing the error
 *
 * @module fileScript
 */

module.exports = function fileScript(input, settings) {
  var checkbox = input.all.delete; // eslint-disable-line
  var upload = input.all.file; // eslint-disable-line
  var container = input.parent.parentNode; // eslint-disable-line
  var link = container.getElementsByClassName('file--link')[0]; // eslint-disable-line
  //var image = link.getElementsByClassName('file--image')[0]; // eslint-disable-line
  // var file = link.getElementsByClassName('file--file')[0]; // eslint-disable-line



    console.log('input all');
    console.log(input);

  // eslint disabled as this is a browser-bound script
  upload.addEventListener('change', function classer(e) { // eslint-disable-line prefer-arrow-callback
    console.log('FILER');
    console.log(e);
    console.log(e.target.files[0]);
    console.log(JSON.stringify(e, null, 2));
    if (e.target.files && e.target.files[0]) {
      if (e.target.files && e.target.files[0]) {
      console.log('e.target.files[0]');
      console.log(e.target.files[0]);
        var reader = new FileReader();

        reader.onload = function (eread) {
          // change the link to the new file
          link.setAttribute('href', eread.target.result);

          // make sure checkbox is no longer checked
          checkbox.checked = false;

          // make sure link is not hidden
          link.style.display = '';

          // image uploaded
          if (e.target.files[0].type.match('image.*')) {
            // create image
            var image = new Image();
            image.title = e.target.files[0].name;
            image.src = eread.target.result;

            // replace file--link contents
            link.innerHTML = '';
            link.appendChild(image);
          }
          else {
            // non-image file
            link.innerHTML = e.target.files[0].name;
          }
        }

        reader.readAsDataURL(e.target.files[0]);
      }
    }
  });

  // eslint disabled as this is a browser-bound script
  checkbox.addEventListener('change', function classer(e) { // eslint-disable-line prefer-arrow-callback
    if (e.target.checked) {
      link.style.display = 'none';
    }
    else {
      link.style.display = '';
    }
  });

  return true;
};
