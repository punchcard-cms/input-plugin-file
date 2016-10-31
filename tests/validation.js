import test from 'ava';
import validation from '../lib/validation';

const input = {
  target: {
    name: 'boolean',
    value: 'foo bar baz',
  },
  all: {
    boolean: 'foo bar baz',
  },
};

const settings = {
  target: {
    empty: false,
  },
  all: {
    boolean: {
      empty: false,
    },
  },
};


// Valid input
test('valid input', t => {
  t.true(validation(input, settings), 'Valid input returns true');
});
