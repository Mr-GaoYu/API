export declare const createDomainSchema: import('yup').ObjectSchema<
  {
    domain: string;
    status: string;
    tags: string[];
    description: string;
    retry_sec: any;
    master_ips: string[];
    axfr_ips: string[];
    expire_sec: any;
    refresh_sec: any;
    ttl_sec: any;
  } & {
    domain: string;
    tags: string[];
    type: string;
    soa_email: string;
    master_ips: string[];
  },
  object
>;
export declare const updateDomainSchema: import('yup').ObjectSchema<
  {
    domain: string;
    status: string;
    tags: string[];
    description: string;
    retry_sec: any;
    master_ips: string[];
    axfr_ips: string[];
    expire_sec: any;
    refresh_sec: any;
    ttl_sec: any;
  } & {
    domainId: any;
    soa_email: string;
    axfr_ips: string[];
    tags: string[];
  },
  object
>;
