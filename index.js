'use strict';

/**
 * File Input Plugin
 *
 *
 * A simple boolean input type
 */
const validation = require('./lib/validation.js');

/**
 * Single File Input Plugin
 * @module fileInputPlugin
 */
module.exports = {
  name: 'file',
  description: 'A file input type',
  validation: {
    fileValidation: validation,
  },
  inputs: {
    file: {
      validation: {
        function: 'fileValidation',
        on: 'change',
      },
      type: 'file',
      label: 'Upload a file',
      settings: {
        types: [
          '*',
        ],
      },
    },
  },
  html: '<label for="{{file.id}}">{{file.label}}</label><input type="{{file.type}}" id="{{file.id}}" name="{{file.name}}" value="{{file.value}}" {% if settings.types %}{%set comma = joiner() %}accept="{% for type in settings.type %}{{comma()}}{{type}}{% endfor %}{% endif %}" />',
};
