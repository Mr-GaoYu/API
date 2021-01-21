'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createDomainSchema = void 0;

var _yup = require('yup');

var domainSchemaBase = (0, _yup.object)().shape({
  domain: (0, _yup.string)().matches(
    /([a-zA-Z0-9-_]+\.)+([a-zA-Z]{2,3}\.)?([a-zA-Z]{2,16}|XN--[a-zA-Z0-9]+)/,
    '域名不被允许。'
  ),
  status: (0, _yup.mixed)().oneOf([
    'disabled',
    'active',
    'edit_mode',
    'has_errors',
  ]),
  tags: (0, _yup.array)(),
  description: (0, _yup.string)()
    .min(1, '描述内容至少1个字符。')
    .max(255, '描述内容不能超过255个字符。'),
  retry_sec: (0, _yup.number)(),
  master_ips: (0, _yup.array)().of((0, _yup.string)()),
  axfr_ips: (0, _yup.array)()
    .of((0, _yup.string)())
    .typeError('必须是以逗号分隔的IP地址列表。'),
  expire_sec: (0, _yup.number)(),
  refresh_sec: (0, _yup.number)(),
  ttl_sec: (0, _yup.number)(),
});
var createDomainSchema = domainSchemaBase.shape({
  domain: (0, _yup.string)()
    .required('域名不能为空。')
    .matches(
      /([a-zA-Z0-9-_]+\.)+([a-zA-Z]{2,3}\.)?([a-zA-Z]{2,16}|XN--[a-zA-Z0-9]+)/,
      '域名不被允许。'
    ),
  tags: (0, _yup.array)().of((0, _yup.string)()),
  type: (0, _yup.mixed)().required().oneOf(['master', 'slave']),
  soa_email: (0, _yup.string)()
    .when('type', {
      is: function is(type) {
        return type === 'master';
      },
      then: (0, _yup.string)().required('邮箱不能为空。'),
      otherwise: (0, _yup.string)(),
    })
    .email('邮箱不被允许。'),
  master_ips: (0, _yup.array)()
    .of((0, _yup.string)())
    .when('type', {
      is: function is(type) {
        return type === 'slave';
      },
      then: (0, _yup.array)()
        .of((0, _yup.string)())
        .compact()
        .ensure()
        .required('至少需要一个主IP地址。')
        .min(1, '至少需要一个主IP地址。'),
      otherwise: (0, _yup.array)().of((0, _yup.string)()),
    }),
});
exports.createDomainSchema = createDomainSchema;
