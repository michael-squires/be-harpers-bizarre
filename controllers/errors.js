exports.send404 = (req, res) => {
    res.status(404).send({ msg: 'Route not found' })
};

exports.send405 = (req, res) => {
    res.status(405).send({ msg: 'Invalid method' });
};

exports.handleSQLErrors = (err, req, res, next) => {
    const badRequestCodes = ['42703', '22P02', '23502', '23503'];
    if (badRequestCodes.includes(err.code)) {
        res.status(400).send({ msg: 'Bad Request' });
    } else next(err);
};


exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err);
    }
};

exports.handleInternalErrors = (err, req, res, next) => {
    console.log('internal error', err)
    res.status(500).send({ msg: 'Internal server error' });
};
