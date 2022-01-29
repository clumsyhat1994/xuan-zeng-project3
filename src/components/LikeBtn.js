import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
export default function LikeBtn(props) {
    const location = useLocation();
    const navigate = useNavigate();
    /**
    let text = '';
    if (props.likeState !== null) {
        if (props.likeState) text = 'UNLIKE'
        else text = 'LIKE'
    } 
    */
    const text = props.likestate ? 'UNLIKE' : 'LIKE';

    //const text = props.likeState ? 'UNLIKE' : 'LIKE';
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