import MockAdapter from 'axios-mock-adapter';
import request, { baseRequest, setURL } from './request';

const TEST_URL = 'https://www.example.com';

const mock = new MockAdapter(baseRequest);

mock.onAny().reply(200, { data: {} });

beforeEach(() => {
  mock.resetHistory();
  jest.clearAllMocks();
});

describe('Linode JS SDK', () => {
  describe('Base request and helper methods', () => {
    describe('setURL', () => {
      it('should set the specified URL', async () => {
        await request(setURL(TEST_URL));
        expect(mock.history.get[0].url).toMatch(TEST_URL);
      });
    });
  });
});
