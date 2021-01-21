import { array, mixed, number, object, string, AnySchema } from 'yup';

const domainSchemaBase = object().shape({
  domain: string().matches(
    /([a-zA-Z0-9-_]+\.)+([a-zA-Z]{2,3}\.)?([a-zA-Z]{2,16}|XN--[a-zA-Z0-9]+)/,
    '域名不被允许。'
  ),
  status: mixed().oneOf(['disabled', 'active', 'edit_mode', 'has_errors']),
  tags: array(),
  description: string()
    .min(1, '描述内容至少1个字符。')
    .max(255, '描述内容不能超过255个字符。'),
  retry_sec: number(),
  master_ips: array().of(string()),
  axfr_ips: array().of(string()).typeError('必须是以逗号分隔的IP地址列表。'),
  expire_sec: number(),
  refresh_sec: number(),
  ttl_sec: number(),
});

export const createDomainSchema = domainSchemaBase.shape({
  domain: string()
    .required('域名不能为空。')
    .matches(
      /([a-zA-Z0-9-_]+\.)+([a-zA-Z]{2,3}\.)?([a-zA-Z]{2,16}|XN--[a-zA-Z0-9]+)/,
      '域名不被允许。'
    ),
  tags: array().of(string()),
  type: mixed().required().oneOf(['master', 'slave']),
  soa_email: string()
    .when('type', {
      is: (type: string) => type === 'master',
      then: string().required('邮箱不能为空。'),
      otherwise: string(),
    })
    .email('邮箱不被允许。'),
  master_ips: array()
    .of(string())
    .when('type', {
      is: (type) => type === 'slave',
      then: array()
        .of(string())
        .compact()
        .ensure()
        .required('至少需要一个主IP地址。')
        .min(1, '至少需要一个主IP地址。'),
      otherwise: array().of(string()),
    }),
});

export const updateDomainSchema = domainSchemaBase.shape({
  domainId: number(),
  soa_email: string().email('SOA Email is not valid.'),
  axfr_ips: array().of(string()),
  tags: array().of(string()),
});
