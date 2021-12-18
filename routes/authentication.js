module.exports = function (req, res, next) {
    const username = req.session.username;
    if (!username) {
        res.status(401).send('No session available');
    } else {
        req.username = username;
        next();
    }
};