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
  /* nath: urhere:
  1. finish checkbox-value into punchcard for deleting file
  2. add javascript for hide/show of input + check/uncheck of checkbox (which is hidden)
  3. should just accept new file uploaded as delete of old
  */
  html: `<label for="{{file.id}}">{{file.label}}</label>
    {% set classes = '' %}
    {% set filepath = '/files' %}

    {% if storage.public %}
      {% set filepath = storage.public %}
    {% endif %}

    {% if file.value %}
      {% set classes = 'file--uploaded' %}
      {{file.value | dump}}

      {% if file.value %}
        {# regex: if file type is image #}
        {% set imgregex = r/image.*/g %}

        <a href="{{filepath}}{{file.value.relative}}">
          {% if imgregex.test(file.value.type) %}
            <img src="{{filepath}}{{file.value.relative}}">
          {% else %}
            {{file.value.relative.substring(file.value.relative.lastIndexOf('/') + 1)}}
          {% endif %}
        </a>
        <label for="{{file.id}--delete">Delete file <input type="checkbox" id="{{file.id}}--delete"></label>
      {% endif %}
    {% endif %}
    <div class="{{classes}}">
      <input type="{{file.type}}" id="{{file.id}}" name="{{file.name}}" value="{{file.value}}" {% if settings.types %}{%set comma = joiner() %}accept="{% for type in settings.type %}{{comma()}}{{type}}{% endfor %}{% endif %}" />
    </div>
    `,
};
