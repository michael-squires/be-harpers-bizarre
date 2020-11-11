const connection = require('../db/connection');

exports.removeArticleById = (article_id) => {
    console.log('article_id in model', article_id)
    return connection('articles')
        .delete()
        .where({ article_id: article_id })
        .returning('*')
};