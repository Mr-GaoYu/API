import { ResourcePage as Page } from '../types';
import { Domain, CreateDomainPayload, UpdateDomainPayload } from './types';
export declare const getDomains: (
  params?: any,
  filters?: any
) => Promise<Page<Domain>>;
export declare const getDomain: (domainId: number) => Promise<Domain>;
export declare const createDomain: (
  data: CreateDomainPayload
) => Promise<Domain>;
export declare const updateDomain: (
  domainId: number,
  data: UpdateDomainPayload
) => Promise<Domain>;
export declare const deleteDomain: (domainId: number) => Promise<{}>;
