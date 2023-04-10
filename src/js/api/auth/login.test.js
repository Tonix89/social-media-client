import { login } from './login.js';

const global = globalThis;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

global.localStorage = localStorageMock;

const email_value = 'example@noroff.no';
const pw_value = 'Abcd1234';

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue([{ token: 'jhdfsdfb3y4983dsn283' }]),
});

global.fetch = mockFetchSuccess;

describe('login', () => {
  it('fetches and save an access token in browser storage', async () => {
    const data = await login(email_value, pw_value);
    localStorage.setItem('token', data.token);
    expect(localStorage.getItem('token')).toBe(data.token);
  });
});
