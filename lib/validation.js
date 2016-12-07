'use strict';

/**
 * Validation for File Input Plugin - input field
 *
 * @param {Object} input - inputs in this plugin's instance and their values as {String}
 * @param {Object} input.target - the triggering input's name and value as {String}
 * @param {String} input.target.name - the triggering input's name
 * @param {String|Bool} input.target.value - the triggering input's value
 * @param {Object} input.all - all inputs in this plugin's instance
 * @param {String|Bool} input.all.boolean - value of input file
 * @param {Object} [settings] - settings for this input plugin instance
 * @param {Object} [settings.target] - the triggering input's settings as an {Object}
 * @param {Object} [settings.all] - all settings in this plugin instance as an {Object}
 * @param {Object} [settings.all.boolean] - settings of input file {Object}
 *
 * @returns {Bool|String} true or a string with the text describing the error
 *
 * @module fileValidation
 */

const fileValidation = function fileValidation(input, settings) {
  let extension = '.';

  if (input.target.value && settings.target.types && Array.isArray(settings.target.types)) {
    if (settings.target.types.length > 1 || settings.target.types[0] !== '*') {
      extension += input.target.value.split('.').pop();

      if (settings.target.types.indexOf(extension) < 0) {
        return `Invalid extension '${extension}'. Valid extensions are '${settings.target.types.join(', ')}'`;
      }
    }
  }

  return true;
};

/**
 * Validation for File Input Plugin - checkbox delete file
 *
 * @returns {bool} true or a string with the text describing the error
 *
 * @module checkboxValidation
 */
const checkboxValidation = function checkboxValidation() {
  return true;
};

module.exports = {
  fileValidation,
  checkboxValidation,
};
