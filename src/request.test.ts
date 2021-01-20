import MockAdapter from 'axios-mock-adapter';
import { baseRequest } from './request';

const TEST_URL = 'https://www.example.com';

const mock = new MockAdapter(baseRequest);

mock.onAny().reply(200, { data: {} });

beforeEach(() => {
  mock.resetHistory();
  jest.clearAllMocks();
});
