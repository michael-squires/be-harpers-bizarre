const { fetchAllTopics } = require('../models/topic-m')


exports.getAllTopics = (req, res, next) => {
    console.log('in topics controller')
    fetchAllTopics()
}