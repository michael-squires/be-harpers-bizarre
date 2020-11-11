const connection = require('../db/connection');

exports.fetchUserByUsername = (username) => {
    return connection
        .select('*')
        .from('users')
        .where('username', '=', username)
        .then((users) => {
            if (users.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: `${username} not found`
                })
            }
            return users[0]
        });
};