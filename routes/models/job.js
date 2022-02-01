const mongoose = require('mongoose');
const JobSchema = require('../schema/job').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function getAllJobs() {
    return JobModel.find().limit(10).exec();
}

function getAllJobsExcept(arr) {
    return JobModel.find({ job_title: { $nin: arr } }).limit(10).exec();
}

function search(keyword, query) {

    const workplaceFilterString = query.workplaceFilterString;
    const employmentTypeFilterString = query.employmentTypeFilterString;

    const workplaceFilters = workplaceFilterString && workplaceFilterString.split(',');
    const employmentTypeFilters = employmentTypeFilterString && employmentTypeFilterString.split(',');

    return JobModel.find({
        job_title: { $regex: keyword, $options: "i" },
        workplace_type: { $in: workplaceFilters ? workplaceFilters : ['On-site', 'Hybrid', 'Remote'] },
        employment_type: { $in: employmentTypeFilters ? employmentTypeFilters : ['Full-time', 'Part-time', 'Internship', 'Volunteer'] }
    }, 'job_title location company_name').exec();
}


function createJob(job) {
    return JobModel.create(job);
}

function updateJob(job) {
    const jobInstance = new JobModel({
        job_title: job.job_title,
        company_name: job.company_name,
        location: job.location,
        description: job.description,
        employer_email: job.employer_email,
        company_website: job.company_website,
        _id: job._id,
        workplace_type: job.workplace_type,
        employment_type: job.employment_type,
        apply_link: job.apply_link
    });
    return JobModel.findByIdAndUpdate(job._id, jobInstance).exec();
}



function findJobByTitle(title) {
    return JobModel.find({ job_title: title }).exec();
}

function findJobById(id) {
    return JobModel.findById(id).exec();
}

function deleteJob(id) {
    return JobModel.findByIdAndRemove(id).exec();
}

module.exports = {
    createJob,
    updateJob,
    findJobByTitle,
    findJobById,
    getAllJobs,
    search,
    deleteJob,
    getAllJobsExcept,

}
