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
    const [finishLoad, setFinishLoad] = useState(false);
    const navigate = useNavigate();
    const updateBtn = (<button id="update" key='update' onClick={
        () => {
            navigate('/updateJob/' + id);
        }
    }>UPDATE</button>);
    const deleteBtn = (<button id="delete" key='delete' onClick={
        () => {
            axios.delete('/api/job/delete/', { data: { jobId: id } })
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

    const likeBtn = finishLoad ? <LikeBtn likeState={likeState} jobId={id} setLikeState={setLikeState} /> : null;
    const applyBtn = finishLoad ? <button id="apply"><a href={detail.company_website ? detail.company_website : undefined} target="_blank">APPLY</a></button> : null;

    function getDetail() {
        axios.get('/api/job/id/' + id)
            .then(response => {
                if (!response.data) {
                    setDefaultMsg("Nothing found!");
                }
                setDetail(response.data);
                setBtns(response.data.creator);
                setFinishLoad(true);
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
                        setLikeState(true);
                    } else {
                        setLikeState(false);
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
                </div>
                <div><a href={detail.company_website ? detail.company_website : undefined} target="_blank">{detail.company_name}</a></div>
                <div>{detail.location}</div>
                <div><a href={"mailto:" + detail.employer_email}>{detail.employer_email}</a></div>
                <div>Posted: {detail.posting_date_formatted}</div>
            </header>

            {applyBtn}
            {likeBtn}
            <p id="description">{detail.description}</p>
            {buttons}
        </div>
    );
    //<button id="apply"><a href={detail.company_website ? detail.company_website : undefined} target="_blank">APPLY</a></button>
    //<LikeBtn likeState={likeState} jobId={id} setLikeState={setLikeState} />
}
