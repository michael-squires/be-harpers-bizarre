const { fetchAllTopics } = require('../models/topics-m')


exports.getAllTopics = (req, res, next) => {
    console.log('in topics controller')
    fetchAllTopics().then(topics => {
        res.status(200).send({ topics })
    });
};