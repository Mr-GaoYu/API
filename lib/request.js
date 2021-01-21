'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports[
  'default'
] = exports.requestGenerator = exports.setXFilter = exports.setData = exports.setParams = exports.setMethod = exports.setURL = exports.isEmpty = exports.setToken = exports.baseRequest = void 0;

var _axios = _interopRequireDefault(require('axios'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var baseRequest = _axios['default'].create({
  baseURL: 'https://cmp.thclouds.com',
});

exports.baseRequest = baseRequest;

var setToken = function setToken(token) {
  return baseRequest.interceptors.request.use(function (config) {
    return _objectSpread(
      _objectSpread({}, config),
      {},
      {
        headers: _objectSpread(
          _objectSpread({}, config.headers),
          {},
          {
            Authorization: 'Bearer '.concat(token),
          }
        ),
      }
    );
  });
};

exports.setToken = setToken;

var set = function set(field, value) {
  return function (object) {
    return isEmpty(value)
      ? object
      : _objectSpread(
          _objectSpread({}, object),
          {},
          _defineProperty({}, field, value)
        );
  };
};

var isEmpty = function isEmpty(v) {
  return (
    v === undefined ||
    v === null ||
    v.length === 0 ||
    (_typeof(v) === 'object' &&
      Object.keys(v).length === 0 &&
      v.constructor === Object)
  );
};

exports.isEmpty = isEmpty;

var setURL = function setURL(url) {
  return set('url', url);
};

exports.setURL = setURL;

var setMethod = function setMethod(method) {
  return set('method', method);
};

exports.setMethod = setMethod;

var setParams = function setParams() {
  var params =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return set('params', params);
};

exports.setParams = setParams;

var setData = function setData(data, schema, postValidationTransform) {
  if (!schema) {
    return set('data', data);
  }

  var updatedData =
    typeof postValidationTransform === 'function'
      ? postValidationTransform(data)
      : data;

  try {
    schema.validateSync(data, {
      abortEarly: false,
    });
    return set('data', updatedData);
  } catch (error) {
    return function (object) {
      return _objectSpread(
        _objectSpread({}, object),
        {},
        {
          data: updatedData,
          validationErrors: convertYupToLinodeErrors(error),
        }
      );
    };
  }
};

exports.setData = setData;

var convertYupToLinodeErrors = function convertYupToLinodeErrors(
  validationError
) {
  var inner = validationError.inner;

  if (inner && inner.length > 0) {
    return inner.reduce(function (result, innerValidationError) {
      var err = convertYupToLinodeErrors(innerValidationError);
      return Array.isArray(err)
        ? [].concat(_toConsumableArray(result), _toConsumableArray(err))
        : [].concat(_toConsumableArray(result), [err]);
    }, []);
  }

  return [mapYupToLinodeAPIError(validationError)];
};

var mapYupToLinodeAPIError = function mapYupToLinodeAPIError(_ref) {
  var message = _ref.message,
    path = _ref.path;
  return _objectSpread(
    {
      reason: message,
    },
    path && {
      field: path,
    }
  );
};

var setXFilter = function setXFilter(xFilter) {
  return function (object) {
    return isEmpty(xFilter)
      ? object
      : _objectSpread(
          _objectSpread({}, object),
          {},
          {
            headers: _objectSpread(
              _objectSpread({}, object.headers),
              {},
              {
                'X-Filter': JSON.stringify(xFilter),
              }
            ),
          }
        );
  };
};

exports.setXFilter = setXFilter;

var requestGenerator = function requestGenerator() {
  var config = reduceRequestConfig.apply(void 0, arguments);

  if (config.validationErrors) {
    return Promise.reject(config.validationErrors);
  }

  return baseRequest(config).then(function (response) {
    return response.data;
  });
};

exports.requestGenerator = requestGenerator;

var reduceRequestConfig = function reduceRequestConfig() {
  for (
    var _len = arguments.length, fns = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    fns[_key] = arguments[_key];
  }

  return fns.reduceRight(
    function (result, fn) {
      return fn(result);
    },
    {
      url: 'https://api.linode.com/v4',
      headers: {},
    }
  );
};

var _default = requestGenerator;
exports['default'] = _default;
