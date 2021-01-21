export interface Domain {
  id: number;
  domain: string;
  soa_email: string;
  description: string;
  refresh_sec: number;
  retry_sec: number;
  expire_sec: number;
  ttl_sec: number;
  status: DomainStatus;
  tags: string[];
  master_ips: string[];
  axfr_ips: string[];
  group: string;
  type: DomainType;
  updated: string;
}
export declare type DomainStatus =
  | 'active'
  | 'disabled'
  | 'edit_mode'
  | 'has_errors';
export declare type DomainType = 'master' | 'slave';
