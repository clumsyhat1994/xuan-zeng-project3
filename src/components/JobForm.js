import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function JobForm() {
    const [form, setForm] = useState({});
    const [workplaceType, setWorkPlaceType] = useState('select');
    const [employmentType, setEmploymentType] = useState('select');
    const navigate = useNavigate();
    const id = useParams().id;
    const [errMsg, setErrMsg] = useState('');
    const url = id ? '/api/job/update/' : '/api/job/post'

    useEffect(fillForm, []);
    useEffect(checkLoggedIn, []);

    function fillForm() {
        if (id) {
            axios.get('/api/job/id/' + id)
                .then(response => {
                    if (!response.data) {
                        return;
                    }
                    setForm(response.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    function checkLoggedIn() {
        axios.get('/api/user/isLoggedIn')
            .then(response => console.log('Username logged in: ' + response.data))
            .catch((err) => {
                navigate('/login', { state: { from: '/postJob' } })
                console.log(err.response.data)
            });
    }

    function handleSubmit() {
        const { job_title, company_name, location, description
            , employer_email, apply_link, company_website } = form;
        if (!job_title || !company_name || !location || !description || !employer_email || !apply_link || !company_website || workplaceType === 'select' || employmentType === 'select') {
            return setErrMsg('Missing Data');
        }
        const postForm = {
            ...form,
            workplace_type: workplaceType,
            employment_type: employmentType
        }
        axios.post(url, postForm)
            .then((res) => {
                navigate('/jobDetail/' + res.data);
            })
            .catch(e => console.log(e.response.data));
    }

    return (
        <div id="job_form">


            <label htmlFor="job_title">Job title *</label>
            <input type='text' id="job_title" value={form.job_title} onChange={(e) => {
                setForm({
                    ...form,
                    job_title: e.target.value
                })
            }}></input>

            <label htmlFor="company">Company *</label>
            <input type='text' id="company" value={form.company_name}
                onChange={(e) => {
                    setForm({
                        ...form,
                        company_name: e.target.value
                    })
                }}></input>

            <label htmlFor="workplace_type">Workplace type *</label>
            <select id='workplace_type' onChange={(e) => { console.log(e.target.value); setWorkPlaceType(e.target.value); }}>
                <option value='select' hidden>Please select...</option>
                <option value='On-site'>On-site</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Remote'>Remote</option>
            </select>
            <label htmlFor="employment_type" onChange={(e) => { setEmploymentType(e.target.value) }}>Employment type *</label>
            <select id='employment_type' onChange={(e) => { setEmploymentType(e.target.value) }}>
                <option value='select' hidden>Please select...</option>
                <option value='Full-time'>Full-time</option>
                <option value='Part-time'>Part-time</option>
                <option value='Internship'>Internship</option>
                <option value='Volunteer'>Volunteer</option>
            </select>

            <label htmlFor="company_website">Company website</label>
            <input type='text' id="company_website" value={form.company_website} onChange={(e) => {
                setForm({
                    ...form,
                    company_website: e.target.value
                })
            }}></input>

            <label htmlFor="Apply_link">Apply link *</label>
            <input type='text' id="Apply_link" value={form.apply_link} onChange={(e) => {
                setForm({
                    ...form,
                    apply_link: e.target.value
                })
            }}></input>

            <label htmlFor="location">Location *</label>
            <input type='text' id="location" value={form.location} onChange={(e) => {
                setForm({
                    ...form,
                    location: e.target.value
                })
            }}></input>
            <label htmlFor="employer_email">Employer e-mail *</label>
            <input type='text' id="employer_email" value={form.employer_email} onChange={(e) => {
                setForm({
                    ...form,
                    employer_email: e.target.value
                })
            }}></input>
            <label htmlFor="job_description">Job description *</label>
            <textarea id='job_description' value={form.description} onChange={(e) => {
                setForm({
                    ...form,
                    description: e.target.value
                })
            }}></textarea>
            <div className='error'>{errMsg}</div>
            <button type='button' onClick={handleSubmit}>SUBMIT</button>

        </div>
    );
}