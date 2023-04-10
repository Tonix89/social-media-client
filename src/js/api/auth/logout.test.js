import { logout } from './logout';

const global = globalThis;

const key = 'token';
const value = 'sdhgfs875750928';

global.window = {};

const localStorageMock = (() => {
  let storage = {};

  return {
    setItem: (key, value) => (storage[key] = value.toString()),
    removeItem: (key) => delete storage[key],
    getItem: (key) => storage[key] || null,
    clear: () => (storage = {}),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

global.localStorage = localStorageMock;

describe('logout', () => {
  it('clears the token from browser storage', async () => {
    localStorage.setItem(key, value);
    logout();
    expect(localStorage.getItem(key)).toBeNull();
  });
});
