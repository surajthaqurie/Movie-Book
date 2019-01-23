const request = require('supertest');
require('../../models/geners');

let server;

describe('/api/geners', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => { server.close(); });

    describe('Get /', () => {
        it('should return all genres', async () => {
            const res = await request(server).get('/api/geners');
            expect(res.status).toBe(200);
        });
    });
});