const connection = require('../db/connection');

exports.amendCommentVotes = (comment_id, inc_votes) => {
    return connection('comments')
        .select('votes')
        .where({ comment_id: comment_id })
        .returning('*')
        .then(response => {
            if (response.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: `comment ${comment_id} not found`
                })
            } else {
                const currentVotes = response[0].votes
                const updatedVotes = currentVotes + inc_votes
                return connection('comments')
                    .update({ votes: updatedVotes })
                    .where({ comment_id: comment_id })
                    .returning('*')
            };
        });
};

exports.removeCommentById = (comment_id) => {
    return connection('comments')
        .delete()
        .where({ comment_id: comment_id })
        .returning('*')
};