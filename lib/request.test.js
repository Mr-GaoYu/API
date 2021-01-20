"use strict";

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));

var _request = require("./request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TEST_URL = 'https://www.example.com';
var mock = new _axiosMockAdapter["default"](_request.baseRequest);
mock.onAny().reply(200, {
  data: {}
});
beforeEach(function () {
  mock.resetHistory();
  jest.clearAllMocks();
});