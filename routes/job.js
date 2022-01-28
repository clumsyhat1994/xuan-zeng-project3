const express = require('express');
const router = express.Router();
const JobFunctions = require('./models/job');
const authentication = require('./authentication');

router.get('/test', function (req, res) {

    res.send("hello!");
})

router.get('/', function (req, res) {
    const arr = req.query.names.split(',');
    JobFunctions.getAllJobsExcept(arr)
        .then(allJobs => res.send(allJobs))
        .catch(err => res.status(400).send(err));
})

router.get('/search/:keyword', function (req, res) {
    JobFunctions.search(req.params.keyword)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(err => res.status(400).send(err));
})

router.get('/title/:title', function (req, res) {
    JobFunctions.findJobByTitle(req.params.title)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(err => res.status(400).send(err));
})

router.get('/id/:id', function (req, res) {
    JobFunctions.findJobById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
            //console.log(result)
        })
        .catch(err => res.status(400).send(err));
})

router.post('/post', authentication, function (req, res) {
    const { job_title, company_name, location, description
        , employer_email } = req.body;
    if (!job_title || !company_name || !location || !description || !employer_email) {
        return res.status(422).send('Missing data');
    }
    req.body = { ...req.body, creator: req.username }
    JobFunctions.createJob(req.body)
        .then(result => res.status(200).send(result._id))
        .catch(err => res.status(400).send(err));
})

router.post('/update', function (req, res) {
    const { job_title, company_name, location, description
        , employer_email, company_website, _id } = req.body;
    if (!job_title || !company_name || !location || !description || !employer_email || !_id) {
        return res.status(422).send('Missing data');
    }
    JobFunctions.updateJob(req.body)
        .then(result => res.status(200).send(_id))
        .catch(err => res.status(400).send(err));
})

router.delete('/delete', function (req, res) {
    const { jobId } = req.body;
    if (!jobId) {
        return res.status(422).send('Missing data');
    }
    JobFunctions.deleteJob(jobId)
        .then(result => res.status(200).send('OK'))
        .catch(e => res.status(400).send(e));
})

module.exports = router;