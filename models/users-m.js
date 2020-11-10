const connection = require('../db/connection');

exports.fetchUserByUsername = (username) => {
    return connection
        .select('*')
        .from('users')
        .where('username', '=', username)
        .then((users) => {
            console.log('users in fetchUser model', users)
            if (users.length === 0) {
                Promise.reject({
                    status: 404,
                    msg: `${username} not found`
                })
            }
            return users[0]
        });
};