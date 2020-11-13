const { amendCommentVotes, removeCommentById } = require('../models/comments-m');

exports.patchCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;
    amendCommentVotes(comment_id, inc_votes)
        .then(comments => {
            res.status(201).send(comments[0])
        })
        .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    removeCommentById(comment_id)
        .then((deletedComment) => {
            if (deletedComment.length === 0) {
                res.status(404).send({ msg: `comment ${comment_id} not found` })
            }
            else res.status(204).send()
        })
        .catch(next);
};