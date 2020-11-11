const { removeArticleById } = require('../models/articles-m');

exports.deleteArticleById = (req, res, next) => {
    const { article_id } = req.params;


    removeArticleById(article_id)
        .then((deletedArticle) => {
            if (deletedArticle.length === 0) {
                res.status(404).send({ msg: `article ${article_id} not found` })
            }
            else res.status(204).send()
        })
        .catch(next);
}