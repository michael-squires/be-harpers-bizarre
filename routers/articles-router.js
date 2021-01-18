const articlesRouter = require('express').Router();
const {
    getArticles,
    getArticleById,
    getArticleComments,
    deleteArticleById,
    patchArticleById,
    addCommentToArticle,
} = require('../controllers/articles-c');

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .delete(deleteArticleById)
    .patch(patchArticleById)

articlesRouter.route('/:article_id/comments')
    .post(addCommentToArticle)
    .get(getArticleComments)

module.exports = articlesRouter;