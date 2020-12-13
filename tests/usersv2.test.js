import { createMocks } from 'node-mocks-http';
import usersHandler from '../src/pages/api/v2/users/index';

describe('/api/v2/users/*', () => {
    test('return insert successfully if hitted with correct data.', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                username: 'c3budiman99',
                password: 'wowimpassword123',
                email: 'c3budiman99@gmail.com',
                name: 'Cecep Budiman Test'
            },
        });

        await usersHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
    });

    test('return select all the users data.', async () => {
        const { req, res } = createMocks({
            method: 'GET'
        });

        await usersHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
    });

    test('return delete user data.', async () => {
        const { req, res } = createMocks({
            method: 'DELETE',
            body: {
                username: 'c3budiman99'
            },
        });

        await usersHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
    });
});