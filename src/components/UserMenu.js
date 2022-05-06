import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
export default function UserMenu(props) {
    const username = localStorage.getItem('username');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div id="userMenu">
            <div>{username}</div>
            <button id="fav_job" onClick={() => navigate('/myFav')}>Favorites</button>
            <button id="post_job" onClick={() => navigate('/postJob/1')}>Post job</button>
            <button type="button" key='logout' onClick={() => {
                axios.post('/api/user/logout')
                    .then(() => {
                        localStorage.removeItem('username');
                        dispatch({ type: 'LOGOUT' });
                        navigate('/');
                    })
                    .catch(console.error)
            }}>
                Log out
            </button>
        </div>
    );
}