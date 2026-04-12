

jest.mock('../src/js/api.js', () => ({
  apiPost: jest.fn(),
}));

const { login } = require('../../src/js/auth-test.js');
const { apiPost } = require('../../src/js/api.js');

global.localStorage = {
    setItem: jest.fn(),
};

describe('login', () => {
    test('onnistunut kirjautuminen', async () => {

        apiPost.mockResolvedValue({
            user: { id: 1, username: 'testuser' },
            token: '123abc'
        });

        const user = await login('testuser', 'password');

        expect(user.username).toBe('testuser');
    });

    test('virheellinen syöte', async () => {
        await expect(login('', 'salasana')).rejects.toThrow();
    });

});