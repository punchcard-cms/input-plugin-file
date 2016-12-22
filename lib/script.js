/* eslint-disable */
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
  const checkbox = input.all.delete;
  const upload = input.all.file;
  const container = input.parent.parentNode;
  let link = container.querySelector('.file--link');
  const deleter = container.querySelector('.file--delete-label');
  let file;

  /**
   * Clear a node's contents
   * @param  {object} node - obj to be emptied
   */
  const clear = function clear (node) {
    const replace = node.cloneNode(false);
    node.parentNode.replaceChild(replace, node);
    return replace;
  }

  /**
   * Load handler for FileReader
   * @param  {[type]} event - handler executed when the load event is fired
   */
  const loadHandler = function loadHandler (event) {
    const target = event.target;

    // change the link to the new file
    link.setAttribute('href', target.result);

    // make sure checkbox is no longer checked
    checkbox.checked = false;

    // make link not hidden
    link.style.display = '';

    // make delete checkbox not hidden
    deleter.style.display = '';

    // image uploaded
    if (file.type.match('image.*')) {
      // create image
      const image = new Image();
      image.title = file.name;
      image.src = target.result;

      // replace file--link contents
      link = clear(link);
      link.appendChild(image);
    }
    else {
      // non-image file
      link.textContent = file.name;
    }
  }

  /**
   * Upload handler for file upload element
   * @param  {[type]} event - handler executed when the load event is fired
   */
  const uploadHandler = function uploadHandler (event) {
    const target = event.target;

    if (target.files && target.files[0]) {
      file = target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', loadHandler);

      reader.readAsDataURL(file);
    }
  }

  /**
   * Checkbox handler for file delete checkbox
   * @param  {[type]} event - handler executed when the load event is fired
   */
  const checkboxHandler = function checkboxHandler (event) {
    const target = event.target;

    if (target.checked) {
      link.style.display = 'none';
      if (upload.value) {
        upload.value = '';
        link = clear(link);
      }
    }
    else {
      link.style.display = '';
    }
  }

  if (upload) {
    // actions on the file input element
    upload.addEventListener('change', uploadHandler);
  }

  if (checkbox) {
    // actions on the checkbox element
    checkbox.addEventListener('change', checkboxHandler);
  }
};
