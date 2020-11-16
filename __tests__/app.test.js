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
    describe('/topics', () => {
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
    describe('/users/:username', () => {
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
        test('GET - status 404 - for a non existent user', () => {
            return request(app)
                .get('/api/users/nobody')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('nobody not found');
                });
        });
    });
    describe('/articles/:article_id', () => {
        test('DELETE: status 204 no content for a successful deletion', () => {
            return request(app).delete('/api/articles/7')
                .expect(204);
        });
        test('DELETE: 204 - sets the article_id of any comments related to that article to null', () => {
            return request(app).delete('/api/articles/9')
                .expect(204)
                .then(() => {
                    return connection
                        .select('*')
                        .from('comments')
                        .where('comment_id', '=', '1')
                })
                .then(comments => {
                    expect(comments[0].article_id).toBe(null);
                })
        });
        test('DELETE - status 404 - for a non existent article', () => {
            return request(app)
                .delete('/api/articles/9999')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('article 9999 not found');
                });
        });
        test('PATCH - status 201 - responds with the article with updated vote count', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 50 })
                .expect(201)
                .then(({ body }) => {
                    expect(body.title).toEqual('Living in the shadow of a great man')
                    expect(body.votes).toEqual(150)
                })
        });
        test('PATCH will decrease votes if sent negative number', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: -50 })
                .expect(201)
                .then(({ body }) => {
                    expect(body.title).toEqual('Living in the shadow of a great man')
                    expect(body.votes).toEqual(50)
                })
        });
        test('PATCH - status 404 - for a non existent article', () => {
            return request(app)
                .patch('/api/articles/9999')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('article 9999 not found');
                });
        });
    });
    describe.only('/articles/article_id/comments', () => {
        test('POST - status 201 - comment created and returned', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({
                    username: 'lurker',
                    body: 'totally random comment'
                })
                .expect(201)
                .then(({ body }) => {
                    expect(body).toEqual({
                        comment_id: 19,
                        author: 'lurker',
                        article_id: 1,
                        votes: 0,
                        created_at: expect.any(String),
                        body: 'totally random comment'
                    })
                });
        });
        test('POST - status 404 if user does not exist', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({
                    username: 'I don\'t exist',
                    body: 'totally random comment'
                })
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('I don\'t exist not found');
                });
        });
        test('POST - status 404 - for a non existent article', () => {
            return request(app)
                .post('/api/articles/666/comments')
                .send({
                    username: 'lurker',
                    body: 'comment about article that does not exist'
                })
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('article 666 not found');
                });
        });
        test('GET - status 200 - returns array of comments for the article specified, sorted by created_by in descending order ', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                    expect(body.length).toBe(13)
                    expect(Object.keys(body[0]))
                        .toEqual(
                            expect.arrayContaining([
                                'comment_id',
                                'author',
                                'article_id',
                                'votes',
                                'created_at',
                                'body'
                            ])
                        );
                    expect(body).toBeSortedBy('created_at', { descending: true })
                })
        });
        test('GET - returned array sorted in ascending order if ?order = asc added', () => {
            return request(app)
                .get('/api/articles/1/comments?order=asc')
                .expect(200)
                .then(({ body }) => {
                    expect(body).toBeSortedBy('created_at')
                })
        });
        test('GET - returned array sorted by column specified in query', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=author')
                .expect(200)
                .then(({ body }) => {
                    expect(body).toBeSortedBy('author', { descending: true })
                })
        });
        test('GET - returned array can be sorted by column in ascending order', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=author&&order=asc')
                .expect(200)
                .then(({ body }) => {
                    expect(body).toBeSortedBy('author')
                })
        });
    });
    describe('/articles', () => {
        test('GET - 200 - returns array of articles including comment_count, sorted by created_at in descending order)', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body }) => {
                    const { articles } = body;
                    expect(articles).toBeSortedBy('created_at', { descending: true })
                    expect(articles[0]).toMatchObject({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: '13'
                    })
                })
        });
        test('GET - 200 - will return array of articles filtered by author, sorted by topic (ascending order) where those queries chained to request', () => {
            return request(app)
                .get('/api/articles?author=rogersop&&sort_by=topic&&order=asc')
                .expect(200)
                .then(({ body }) => {
                    const { articles } = body;
                    expect(articles.length).toBe(3)
                    expect(articles.every(({ author }) => (author = 'rogersop'))).toBe(true)
                    expect(articles).toBeSortedBy('topic')
                })
        })
    });
    describe('/comments/:comment_id', () => {
        test('PATCH - status 201 - responds with the comment object with updated vote count', () => {
            return request(app)
                .patch('/api/comments/1')
                .send({ inc_votes: 50 })
                .expect(201)
                .then(({ body }) => {
                    expect(body.comment_id).toBe(1)
                    expect(body.votes).toEqual(66)
                })
        });
        test('PATCH will decrease votes if sent negative number', () => {
            return request(app)
                .patch('/api/comments/1')
                .send({ inc_votes: -50 })
                .expect(201)
                .then(({ body }) => {
                    expect(body.comment_id).toBe(1)
                    expect(body.votes).toEqual(-34)
                })
        });
        test('PATCH - status 404 - for a non existent comment', () => {
            return request(app)
                .patch('/api/comments/9999')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('comment 9999 not found');
                });
        });
        test('DELETE: status 204 no content for a successful deletion', () => {
            return request(app).delete('/api/comments/7')
                .expect(204);
        });
        test('DELETE - status 404 - for a non existent comment', () => {
            return request(app)
                .delete('/api/comments/9999')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('comment 9999 not found');
                });
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
//});




