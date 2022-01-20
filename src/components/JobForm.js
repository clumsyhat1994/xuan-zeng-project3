import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function JobForm() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const id = useParams().id;
    const [errMsg, setErrMsg] = useState('');
    let url = '/api/job/post';
    if (id) {
        url = '/api/job/update/';
    }

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
                navigate('/login')
                console.log(err)
            });
    }

    function handleSubmit() {
        const { job_title, company_name, location, description
            , employer_email } = form;
        if (!job_title || !company_name || !location || !description || !employer_email) {
            return setErrMsg('Missing Data');
        }
        axios.post(url, form)
            .then((res) => {
                navigate('/jobDetail/' + res.data);
            })
            .catch(e => console.log(e.response.data));
    }

    return (
        <div id="job_form">
            <div className='error'>{errMsg}</div>
            <label htmlFor="job_title">Job Title *</label>
            <input type='text' id="job_title" value={form.job_title} onChange={(e) => {
                setForm({
                    ...form,
                    job_title: e.target.value
                })
            }}></input>
            <label htmlFor="company_name">Company Name *</label>
            <input type='text' id="company_name" value={form.company_name}
                onChange={(e) => {
                    setForm({
                        ...form,
                        company_name: e.target.value
                    })
                }}></input>
            <label htmlFor="company_website">Company Website</label>
            <input type='text' id="company_website" value={form.company_website} onChange={(e) => {
                setForm({
                    ...form,
                    company_website: e.target.value
                })
            }}></input>
            <label htmlFor="location">Location *</label>
            <input type='text' id="location" value={form.location} onChange={(e) => {
                setForm({
                    ...form,
                    location: e.target.value
                })
            }}></input>
            <label htmlFor="employer_email">Employer Email *</label>
            <input type='text' id="employer_email" value={form.employer_email} onChange={(e) => {
                setForm({
                    ...form,
                    employer_email: e.target.value
                })
            }}></input>
            <label htmlFor="job_description">Job Description *</label>
            <textarea id='job_description' value={form.description} onChange={(e) => {
                setForm({
                    ...form,
                    description: e.target.value
                })
            }}></textarea>
            <button type='button' onClick={handleSubmit}>SUBMIT</button>

        </div>
    );
}