const Schema = require('mongoose').Schema;
const { DateTime } = require('luxon');
const JobSchema = new Schema({
    job_title: { type: String, required: true },
    company_name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    employer_email: { type: String, required: true },
    company_website: String,
    apply_link: { type: String, required: true },
    posting_date: { type: Date, default: Date.now },
    workplace_type: { type: String, required: true },
    employment_type: { type: String, required: true },
    creator: { type: String, required: true }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
JobSchema
    .virtual('posting_date_formatted')
    .get(function () {
        return DateTime.fromJSDate(this.posting_date).toLocaleString(DateTime.DATE_FULL);
    });

exports.JobSchema = JobSchema;