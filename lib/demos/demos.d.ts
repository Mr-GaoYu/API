import { ResourcePage as Page } from '../types';
import { Domain } from './types';
export declare const getDomains: (
  params?: any,
  filters?: any
) => Promise<Page<Domain>>;
export declare const getDomain: (domainId: number) => Promise<Domain>;
