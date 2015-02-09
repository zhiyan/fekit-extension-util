function pad(string, size, options) {
  var i, pad, prefix, _i, _ref;
  if (options == null) {
    options = {};
  }
  prefix = typeof string === 'number';
  if (prefix) {
    _ref = [string, size], size = _ref[0], string = _ref[1];
  }
  if (typeof options === 'string') {
    options = {
      char: options
    };
  }
  if (options.char == null) {
    options.char = ' ';
  }
  string = string.toString();
  pad = '';
  size = size - string.length;
  for (i = _i = 0; 0 <= size ? _i < size : _i > size; i = 0 <= size ? ++_i : --_i) {
    pad += options.char;
  }
  if (prefix) {
    return pad + string;
  } else {
    return string + pad;
  }
};
