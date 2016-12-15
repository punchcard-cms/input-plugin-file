'use strict';

/**
 * File Input Plugin
 *
 *
 * A simple boolean input type
 */
const validation = require('./lib/validation.js');
const script = require('./lib/script.js');

/**
 * Single File Input Plugin
 * @module fileInputPlugin
 */
module.exports = {
  name: 'file',
  description: 'A file input type',
  validation: {
    fileValidation: validation.fileValidation,
    checkboxValidation: validation.checkboxValidation,
  },
  scripts: {
    fileScript: script,
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
    delete: {
      validation: {
        function: 'checkboxValidation',
        on: 'change',
      },
      script: {
        function: 'fileScript',
        on: 'change',
      },
      type: 'checkbox',
      label: 'Delete file',
      options: [
        { label: 'Delete file',
          value: 'true',
        },
      ],
    },
  },
  html: `<label for="{{file.id}}">{{file.label}}</label>
    <div class="field--upload">
      <input type="{{file.type}}" id="{{file.id}}" name="{{file.name}}" value="{{file.value}}" {% if settings.types %}{%set comma = joiner() %}accept="{% for type in settings.type %}{{comma()}}{{type}}{% endfor %}{% endif %}" />
    </div>

    {% if file.value %}
      {% set nofile = '' %}
    {% else %}
      {% set nofile = 'display: none;' %}
    {% endif %}

    {# regex: if file type is image #}
    {% set imgregex = r/image.*/g %}

    <div class="file--delete" style="{{nofile}}">
      {% for option in delete.options %}
        <input type="{{delete.type}}" name="{{delete.name}}" id="{{delete.id}}--{{loop.index}}" value="{{option.value}}" {% if delete.value %}{% if option.value in delete.value %}checked{% endif %}{% endif %}>
        <label for="{{delete.id}}--{{loop.index}}">{{option.label}}</label>
      {% endfor %}
    </div>

    <a href="{{file.value.absolute}}" class="file--link" style="{{nofile}}">
      {% if imgregex.test(file.value.type) %}
        <img src="{{file.value.absolute}}" class="file--image" title="file.value.original">
      {% else %}
        {{file.value.original}}
      {% endif %}
    </a>
    `,
};
