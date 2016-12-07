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
  var file = input.all.file; // eslint-disable-line
  var className = settings.target.classes.hide; // eslint-disable-line

  // eslint disabled as this is a browser-bound script
  checkbox.addEventListener('change', function classer(e) { // eslint-disable-line prefer-arrow-callback
    if (e.target.checked) {
      file.parentElement.classList.add(className);
    }
    else {
      file.parentElement.classList.remove(className);
    }
  });

  return true;
};
