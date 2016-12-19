import test from 'ava';
import validation from '../lib/validation';

test('Empty Input - checkboxValidation', t => {
  const input = {
    target: {
      name: 'file',
      value: '',
    },
    all: {
      file: '',
    },
  };

  const settings = {
    target: {
      types: [
        '*',
      ],
    },
    all: {
      file: {
        types: [
          '*',
        ],
      },
    },
  };

  t.true(validation.checkboxValidation(input, settings), 'Empty input returns true');
});

test('Empty Input', t => {
  const input = {
    target: {
      name: 'file',
      value: '',
    },
    all: {
      file: '',
    },
  };

  const settings = {
    target: {
      types: [
        '*',
      ],
    },
    all: {
      file: {
        types: [
          '*',
        ],
      },
    },
  };

  t.true(validation.fileValidation(input, settings), 'Empty input returns true');
});

test('Valid Input - All Accepted', t => {
  const input = {
    target: {
      name: 'file',
      value: 'punchcard.svg',
    },
    all: {
      file: 'punchcard.svg',
    },
  };

  const settings = {
    target: {
      types: [
        '*',
      ],
    },
    all: {
      file: {
        types: [
          '*',
        ],
      },
    },
  };

  t.true(validation.fileValidation(input, settings), 'Valid input returns true');
});

test('Valid Input - Single Type Accepted', t => {
  const input = {
    target: {
      name: 'file',
      value: 'punchcard.svg',
    },
    all: {
      file: 'punchcard.svg',
    },
  };

  const settings = {
    target: {
      types: [
        '.svg',
      ],
    },
    all: {
      file: {
        types: [
          '.svg',
        ],
      },
    },
  };

  t.true(validation.fileValidation(input, settings), 'Valid input returns true');
});

test('Valid Input - Multiple Types Accepted', t => {
  const input = {
    target: {
      name: 'file',
      value: 'punchcard.svg',
    },
    all: {
      file: 'punchcard.svg',
    },
  };

  const settings = {
    target: {
      types: [
        '.svg',
        '.jpeg',
      ],
    },
    all: {
      file: {
        types: [
          '.svg',
          '.jpeg',
        ],
      },
    },
  };

  t.true(validation.fileValidation(input, settings), 'Valid input returns true');
});

test('Invalid Input - Single Types Accepted', t => {
  const input = {
    target: {
      name: 'file',
      value: 'punchcard.png',
    },
    all: {
      file: 'punchcard.png',
    },
  };

  const settings = {
    target: {
      types: [
        '.svg',
      ],
    },
    all: {
      file: {
        types: [
          '.svg',
        ],
      },
    },
  };

  t.is(validation.fileValidation(input, settings), 'Invalid extension \'.png\'. Valid extensions are \'.svg\'', 'Invalid input returns with string');
});

test('Invalid Input - Multiple Types Accepted', t => {
  const input = {
    target: {
      name: 'file',
      value: 'punchcard.png',
    },
    all: {
      file: 'punchcard.png',
    },
  };

  const settings = {
    target: {
      types: [
        '.svg',
        '.jpeg',
      ],
    },
    all: {
      file: {
        types: [
          '.svg',
          '.jpeg',
        ],
      },
    },
  };

  t.is(validation.fileValidation(input, settings), 'Invalid extension \'.png\'. Valid extensions are \'.svg, .jpeg\'', 'Invalid input returns with string');
});
