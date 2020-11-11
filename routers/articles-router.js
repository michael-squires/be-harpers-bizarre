const articlesRouter = require('express').Router();
const { deleteArticleById } = require('../controllers/articles-c');

articlesRouter.route('/:article_id')
    .delete(deleteArticleById)


module.exports = articlesRouter;

// DELETE /api/articles/:article_id
// PATCH /api/articles/:article_id
// GET /api/articles/:article_id