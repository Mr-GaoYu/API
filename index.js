!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports['@rua/api-v1'] = t())
    : (e['@rua/api-v1'] = t());
})(self, function () {
  return (() => {
    'use strict';
    var e = {
        568: (e, t) => {
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.b = t.a = void 0),
            (t.a = !0),
            (t.b = function (e) {
              return !!e;
            });
        },
      },
      t = {};
    return (function o(r) {
      if (t[r]) return t[r].exports;
      var n = (t[r] = { exports: {} });
      return e[r](n, n.exports, o), n.exports;
    })(568);
  })();
});
