const connection = require('../db/connection');

exports.fetchAllTopics = () => {
    console.log('in topics model')
    return connection
        .select('*')
        .from('topics')
}