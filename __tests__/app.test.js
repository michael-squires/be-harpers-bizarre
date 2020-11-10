const app = require('../app');
const request = require('supertest')
const connection = require('../db/connection');

describe('/api', () => {
    afterAll(() => {
        return connection.destroy();
    });
    beforeEach(() => {
        return connection.seed.run();
    })
    describe('./topics', () => {
        test('GET - status 200 - returns array of all topics', () => {
            return request(app).get('/api/topics')
                .expect(200)
                .then(({ body: { topics } }) => {
                    expect(Array.isArray(topics)).toBe(true);
                    expect(topics.length).toBe(3)
                    expect(Object.keys(topics[0]))
                        .toEqual(
                            expect.arrayContaining([
                                'slug',
                                'description',
                            ])
                        );
                });
        });
    });
    describe('./users/:username', () => {
        test('GET - status 200 - responds with an owner object with correct keys/values', () => {
            return request(app).get('/api/users/lurker')
                .expect(200)
                .then(({ body: { user } }) => {
                    expect(user).toEqual({
                        username: 'lurker',
                        name: 'do_nothing',
                        avatar_url:
                            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    })
                })
        });
        test.only('GET - status 404 - for a non existent user', () => {
            return request(app)
                .get('/api/users/nobody')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('nobody not found');
                });
        });





    });
    describe('/missingRoute', () => {
        test('status 404 - ALL methods', () => {
            const allMethods = ['get', 'post', 'patch', 'put', 'delete'];
            const methodPromises = allMethods.map(method => {
                return request(app)
                [method]('/api/notAValidRoute')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body.msg).toBe('Route not found')
                    });
            });
            return Promise.all(methodPromises)
        });
    });
});




