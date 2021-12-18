import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
export default function LikeBtn(props) {
    //[color, setColor] = useState('white');
    //console.log('state is ' + props.state);
    const navigate = useNavigate();
    let text = 'LIKE';
    if (props.state === 'liked') {
        text = 'UNLIKE'
    }
    function handleClick() {
        if (props.state === 'unliked') {
            axios.post('/api/user/like', { jobId: props.jobId })
                .then(() => { props.setLikeState('liked') })
                .catch((e) => {
                    console.log(e);
                    navigate('/login');
                });
        } else if (props.state === 'liked') {
            axios.post('/api/user/unlike', { jobId: props.jobId })
                .then(() => { props.setLikeState('unliked') })
                .catch((e) => {
                    console.log(e);
                    navigate('/login');
                });
        }
        if (!localStorage.getItem('username')) {
            navigate('/login');
        }
    }
    return (
        <button id="like" className={props.state} onClick={handleClick}>{text}</button>
    );
}