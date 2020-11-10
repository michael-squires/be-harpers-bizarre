const { fetchUserByUsername } = require('../models/users-m');

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    console.log('in users controller', username)
    fetchUserByUsername(username)
        .then((user) => {
            res.status(200).send({ user })
        })
        .catch(next);
};