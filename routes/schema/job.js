const Schema = require('mongoose').Schema;
exports.JobSchema = new Schema({
    job_title: { type: String, required: true },
    company_name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    employer_email: { type: String, required: true },
    company_website: String,
    posting_date: { type: Date, default: Date.now },
    creator: { type: String, required: true }
});