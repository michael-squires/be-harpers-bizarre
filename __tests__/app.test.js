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
                .then((res) => {
                    expect({ body: { topics } }.toEqual
        })
        });
    });



});



