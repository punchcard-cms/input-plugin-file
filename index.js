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
      script: {
        function: 'fileScript',
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
  html: `<div class="file">
    <label for="{{file.id}}" class="file--upload-label">{{file.label}}</label>
    <input type="{{file.type}}" id="{{file.id}}" name="{{file.name}}" value="{{file.value}}" class="file--upload" {% if settings.types %}{%set comma = joiner() %}accept="{% for type in settings.type %}{{comma()}}{{type}}{% endfor %}{% endif %}" />

    {% if file.value %}
      {% set nofile = '' %}
    {% else %}
      {% set nofile = 'display: none;' %}
    {% endif %}

    {# regex: if file type is image #}
    {% set imgregex = r/image.*/g %}

    {% for option in delete.options %}
      <label for="{{delete.id}}--{{loop.index}}" class="file--delete-label" style="{{nofile}}">
        <input type="{{delete.type}}" name="{{delete.name}}" id="{{delete.id}}--{{loop.index}}" class="file--delete"  value="{{option.value}}" {% if delete.value %}{% if option.value in delete.value %}checked{% endif %}{% endif %}>
        {{option.label}}
      </label>
    {% endfor %}

    <a href="{{file.value.path}}" class="file--link" style="{{nofile}}">
      {% if imgregex.test(file.value.type) %}
        <img src="{{file.value.path}}" class="file--image" title="file.value.original">
      {% else %}
        {{file.value.original}}
      {% endif %}
    </a>
  </div>`,
};
