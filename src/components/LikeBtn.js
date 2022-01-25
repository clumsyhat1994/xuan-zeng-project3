import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
export default function LikeBtn(props) {
    const navigate = useNavigate();
    const text = props.likeState ? 'UNLIKE' : 'LIKE';
    function handleClick() {
        if (!localStorage.getItem('username')) {
            navigate('/login');
        }
        const url = props.likeState ? '/api/user/unlike' : '/api/user/like';
        props.setLikeState(!props.likeState);
        axios.post(url, { jobId: props.jobId })
            .then()
            .catch((e) => {
                console.log(e);
                navigate('/login');
            });
    }
    return (
        <button id="like" className={props.likeState ? 'liked' : 'unliked'} onClick={handleClick}>{text}</button>
    );
}