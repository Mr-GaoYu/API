'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.deleteDomain = exports.updateDomain = exports.createDomain = exports.getDomain = exports.getDomains = void 0;

var _constants = require('../constants');

var _request = _interopRequireWildcard(require('../request'));

var _demos = require('./demos.schema');

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

var getDomains = function getDomains(params, filters) {
  return (0, _request['default'])(
    (0, _request.setURL)(''.concat(_constants.API_ROOT, '/domains')),
    (0, _request.setMethod)('GET'),
    (0, _request.setParams)(params),
    (0, _request.setXFilter)(filters)
  );
};

exports.getDomains = getDomains;

var getDomain = function getDomain(domainId) {
  return (0, _request['default'])(
    (0, _request.setURL)(
      ''.concat(_constants.API_ROOT, '/domains/').concat(domainId)
    ),
    (0, _request.setMethod)('GET')
  );
};

exports.getDomain = getDomain;

var createDomain = function createDomain(data) {
  return (0, _request['default'])(
    (0, _request.setData)(data, _demos.createDomainSchema),
    (0, _request.setURL)(''.concat(_constants.API_ROOT, '/domains')),
    (0, _request.setMethod)('POST')
  );
};

exports.createDomain = createDomain;

var updateDomain = function updateDomain(domainId, data) {
  return (0, _request['default'])(
    (0, _request.setURL)(
      ''.concat(_constants.API_ROOT, '/domains/').concat(domainId)
    ),
    (0, _request.setMethod)('PUT'),
    (0, _request.setData)(data, _demos.updateDomainSchema)
  );
};

exports.updateDomain = updateDomain;

var deleteDomain = function deleteDomain(domainId) {
  return (0, _request['default'])(
    (0, _request.setURL)(
      ''.concat(_constants.API_ROOT, '/domains/').concat(domainId)
    ),
    (0, _request.setMethod)('DELETE')
  );
};

exports.deleteDomain = deleteDomain;
