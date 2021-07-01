import { createMocks } from 'node-mocks-http';
import createUserHandler from '../src/pages/api/users/create';
import deleteUsersHandler from "../src/pages/api/users/delete"

describe('/api/users/*', () => {
    test('return insert successfully if hitted with correct data.', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                username: 'c3budiman2',
                password: 'wowimpassword123',
                role: 1,
                bio: '',
                images: ''
            },
        });

        await createUserHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                code: 0,
            }),
        );
    });

    test('return delete user data.', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                username: 'c3budiman2'
            },
        });

        await deleteUsersHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                code: 0,
            }),
        );
    });
});