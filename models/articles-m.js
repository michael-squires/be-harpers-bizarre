const connection = require('../db/connection');
const { formatTimeStamp } = require('../db/utils/data-manipulation')

exports.fetchArticles = ({ sort_by, order, author, topic }) => {
    return connection
        .select(
            'articles.article_id',
            'articles.title',
            'articles.created_at',
            'articles.votes',
            'articles.topic',
            'articles.author'
        )
        .from('articles')
        .count({ comment_count: 'comment_id' })
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .orderBy(sort_by || 'created_at', order || 'desc')
        .modify((query) => {
            if (author) query.where('articles.author', '=', author);
            if (topic) query.where('articles.topic', '=', topic);
        })
        .returning('*')
}

exports.fetchArticleById = (article_id) => {
    return connection
        .select('*')
        .from('articles')
        .where({ article_id: article_id })
        .returning('*')
}

exports.removeArticleById = (article_id) => {
    return connection('articles')
        .delete()
        .where({ article_id: article_id })
        .returning('*')
};

exports.amendArticleVotes = (article_id, inc_votes) => {
    return connection('articles')
        .select('votes')
        .where({ article_id: article_id })
        .returning('*')
        .then(response => {
            if (response.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: `article ${article_id} not found`
                })
            } else {
                const currentVotes = response[0].votes
                const updatedVotes = currentVotes + inc_votes
                return connection('articles')
                    .update({ votes: updatedVotes })
                    .where({ article_id: article_id })
                    .returning('*')
            };
        });
};

exports.createComment = (article_id, username, body) => {
    const timestamp = formatTimeStamp([{ created_at: Date.now() }])[0]
    return connection
        .insert({
            article_id: article_id,
            author: username,
            body: body,
            votes: 0,
            created_at: timestamp.created_at
        })
        .into('comments')
        .returning('*')
};

exports.fetchArticleComments = (article_id, sort_by = 'created_at', order = 'desc') => {
    return connection
        .select('*')
        .from('comments')
        .where({ article_id: article_id })
        .orderBy(sort_by, order)
        .returning('*')
}