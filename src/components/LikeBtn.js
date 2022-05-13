import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
export default function LikeBtn(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const text = props.likeState ? 'UNLIKE' : 'LIKE';
    console.log('like?: ' + props.likeState)
    console.log('text" ' + text)


    function handleClick() {

        if (!localStorage.getItem('username')) {
            navigate('/login', { state: { from: location.pathname } });
        }
        if (props.likeState === null) return;
        const url = props.likeState ? '/api/user/unlike' : '/api/user/like';
        props.setLikeState(!props.likeState);
        axios.post(url, { jobId: props.jobId })
            .then()
            .catch((e) => {
                console.log(e);
                navigate('/login', { state: { from: location.pathname } });
            });
    }
    return (
        <button id="like" className={props.likeState ? 'liked' : 'unliked'} onClick={handleClick}>{text}</button>
    );
}