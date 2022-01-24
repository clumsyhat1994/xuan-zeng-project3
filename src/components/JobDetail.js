import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import LikeBtn from "./LikeBtn";
import { useNavigate } from "react-router";


export default function JobDetail() {

    const id = useParams().id;
    const [detail, setDetail] = useState({});
    const [defaultMsg, setDefaultMsg] = useState('');
    const [likeState, setLikeState] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    const updateBtn = (<button id="update" key='update' onClick={
        () => {
            navigate('/updateJob/' + id);
        }
    }>UPDATE</button>);
    const deleteBtn = (<button id="delete" key='delete' onClick={
        () => {
            axios.delete('/api/job/delete/', { jobId: id })
                .then(() => {
                    navigate('/');
                })
                .catch(e => console.log(e));
        }
    }>DELETE</button>);

    function setBtns(creator) {
        if (localStorage.getItem('username') === creator) {
            setIsOwner(true);
        }
    }


    const buttons = isOwner ? [updateBtn, deleteBtn] : [];

    const likeBtn = likeState ? <LikeBtn state={likeState} jobId={id} setLikeState={setLikeState} /> : null;


    function getDetail() {
        axios.get('/api/job/id/' + id)
            .then(response => {
                if (!response.data) {
                    setDefaultMsg("Nothing found!");
                }
                setDetail(response.data);
                setBtns(response.data.creator);
            })
            .catch(err => {
                console.log(err)
            });
    }

    function checkFav() {
        let username = localStorage.getItem('username')
        if (username) {
            axios.get('/api/user/name/' + username)
                .then((res) => {
                    if (res.data.favorites.includes(id)) {
                        setLikeState('liked');
                    } else {
                        setLikeState('unliked');
                    }
                })
                .catch();
        }
    }

    useEffect(getDetail, []);
    useEffect(checkFav, []);



    return (
        <div id="detail">
            <h1>{defaultMsg}</h1>
            <header>
                <div>
                    <strong>{detail.job_title}</strong>
                    {likeBtn}
                </div>
                <div>{detail.company_name}</div>
                <div>{detail.company_website}</div>
                <div>{detail.location}</div>
                <a href={"mailto:" + detail.employer_email}>{detail.employer_email}</a>
                <div>{detail.posting_date}</div>
            </header>
            <p id="description">{detail.description}</p>
            {buttons}
        </div>
    );

}
