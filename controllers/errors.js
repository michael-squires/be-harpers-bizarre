exports.handleCustomErrors = (err, req, res, next) => {
    console.log('customError error status', err.status)
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

//normal controllers
exports.send405 = (req, res, next) => {
    res.status(405).send({ msg: 'Invalid method' });
};

exports.send404 = (req, res, next) => {
    res.status(404).send({ msg: 'Route not found' })
};