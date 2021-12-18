const express = require('express');
const router = express.Router();
const UserFunction = require('./models/user');
const authentication = require('./authentication');
router.get('/test', function (req, res) {

    res.send("hello!");
})

router.get('/', function (req, res) {
    UserFunction.getAllUser()
        .then(allJobs => res.send(allJobs))
        .catch(err => res.status(400).send(err));
})

router.get('/name/:name', function (req, res) {
    UserFunction.findUserByName(req.params.name)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(err => res.status(400).send(err));
})


router.get('/favList/:name', function (req, res) {
    UserFunction.findUserFav(req.params.name)
        .then(response => res.status(200).send(response))
        .catch(err => res.status(400).send(err));
})

router.get('/id/:id', function (req, res) {
    UserFunction.findUserById(req.params.id)
        .then((result) => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
})

router.get('/isLoggedIn', authentication, function (req, res) {
    res.send(req.session.username);
})

router.post('/', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send('Missing data');
    }
    UserFunction.createUser(req.body)
        .then(result => {
            req.session.username = username;
            res.status(200).send(req.session.username);
        })
        .catch(err => res.status(400).send('Username already exists!'));
})

router.post('/logout', function (req, res) {
    req.session.destroy();
    res.send('Ok');
})

router.post('/login', function (req, res) {
    console.log("Front end is calling!!!!!!!!!!!!!");
    const { username, password } = req.body;
    if (!username || !password) {
        //console.log("Missing data!!!!");
        return res.status(422).send('Missing data');
    }
    //console.log("Begin processing!!!!");
    UserFunction.findUserByName(username)
        .then(result => {
            if (!result) {
                //console.log("No such user!!!!");
                return res.status(404).send('No such user!');
            }
            //console.log('result is ' + result);
            //console.log('password is ' + result.password);

            if (password === result.password) {
                //console.log("log in !!!!");
                req.session.username = username;
                return res.status(200).send(username);
            }
            //console.log("Wrong password!!!!");
            res.status(400).send("Wrong password!");
        })
        .catch(err => res.status(400).send(err));
})

router.post('/like', authentication, function (req, res) {
    const { jobId } = req.body;
    if (!jobId) {
        return res.status(422).send('Missing data');
    }
    UserFunction.addFav(req.username, jobId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
})

router.post('/unlike', authentication, function (req, res) {
    const { jobId } = req.body;
    if (!jobId) {
        return res.status(422).send('Missing data');
    }
    UserFunction.removeFav(req.username, jobId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
})


module.exports = router;