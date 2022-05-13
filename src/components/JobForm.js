import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FormInput from './FormInput';
import ReactQuill, { Quill } from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";

export default function JobForm() {
    const inputs = [
        {
            id: 'job_title',
            title: 'Job title *',
            type: 'text',
            errmsg: 'Please enter the job title',
            required: true
        },
        {
            id: 'company',
            title: 'Company *',
            type: 'text',
            errmsg: 'Please enter the name of your company',
            required: true
        },
        {
            id: 'company_website',
            title: 'Company website',
            type: 'text',
            errmsg: 'Please enter a valid website',
        },
        {
            id: 'apply_link',
            title: 'Apply link *',
            type: 'text',
            errmsg: 'Please enter an apply link',
            required: true
        },
        {
            id: 'Location',
            title: 'Location *',
            type: 'text',
            errmsg: 'Please enter the location of your company',
            required: true
        },
        {
            id: 'employer_email',
            title: 'Employer email *',
            type: 'email',
            errmsg: 'Please enter a valid email address.',
            required: true
        },
    ]
    const [form, setForm] = useState({});
    const [workplaceType, setWorkPlaceType] = useState('select');
    const [employmentType, setEmploymentType] = useState('select');
    const navigate = useNavigate();
    const id = useParams().id;
    const step = useParams().step;
    const [errMsg, setErrMsg] = useState('');
    const [ready, setReady] = useState(false);
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
                navigate('/login', { state: { from: '/postJob/1' } })
                console.log(err.response.data)
            });
    }

    function handleSubmit() {
        //const { job_title, company_name, location, description, employer_email, apply_link, company_website } = form;
        //if (!job_title || !company_name || !location || !description || !employer_email || !apply_link || !company_website || workplaceType === 'select' || employmentType === 'select') return setErrMsg('Missing Data');
        const { description } = form;
        if (!description) {
            return setErrMsg('Job description cannot be empty!');
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


    function validateEmail() {
        //validate email
    }

    function onChange(e) {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const step1 = (
        <div id="job_form">

            {inputs.map((input) => {
                return <FormInput key={input.id} ready={ready} {...input} onChange={onChange} />
            })}


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

            <button type='button' onClick={() => {
                const { job_title, company_name, location, description
                    , employer_email, apply_link, company_website } = form;
                if (!job_title || !company_name || !location || !description || !employer_email || !apply_link || !company_website || workplaceType === 'select' || employmentType === 'select') {
                    console.log(form)
                    return setReady(true);
                }
                navigate('/postJob/2')

            }}>NEXT</button>


        </div>

    );



    const step2 = (
        <>
            <div className='error'>{errMsg}</div>
            <ReactQuill placeholder='Write job description here...' theme="snow" modules={JobForm.modules} onChange={(value) => {
                setForm({
                    ...form,
                    description: value
                })
            }} />
            <div id='job_form'>
                <button type='button' onClick={() => { navigate('/postJob/1') }}>BACK</button>
                <button type='button' onClick={handleSubmit}>SUBMIT</button>
            </div>
        </>)

    return (
        <>
            {step == 1 ? step1 : step2}
        </>
    );
}

JobForm.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}



/**
 *     const step1 = (
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

            <input type='email' id="employer_email" value={form.employer_email} onBlur={validateEmail} onChange={(e) => {
                setForm({
                    ...form,
                    employer_email: e.target.value
                })
            }}></input>




            <div className='error'>{errMsg}</div>
            <button type='button' onClick={() => {
                const { job_title, company_name, location, description
                    , employer_email, apply_link, company_website } = form;
                //console.log('missing data')
                if (!job_title || !company_name || !location || !description || !employer_email || !apply_link || !company_website || workplaceType === 'select' || employmentType === 'select') {
                    return setErrMsg('Missing Data');
                }
                setErrMsg('');
                navigate('/postJob/2')

            }}>NEXT</button>


        </div>

    );

 */