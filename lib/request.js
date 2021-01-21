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
  } catch (error) {}
};

exports.setData = setData;

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
