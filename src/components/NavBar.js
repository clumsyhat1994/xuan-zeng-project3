import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import UserIcon from "./UserIcon";
export default function () {
    const isLoggedin = useSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const username = localStorage.getItem('username');


    const favBtn = (<button id="fav_job" key="fav_job" onClick={() => navigate('/myFav')}>Favorites</button>);
    const postBtn = (<button id="post_job" key="post_job" onClick={() => navigate('/postJob')}>Post job</button>);

    const from = (location.pathname === '/register' || location.pathname === '/login') ? location.state.from : location.pathname;

    const logInBtn =
        (<button type="button" key='login' onClick={() => {
            navigate('/login', { state: { from: from } });
            window.location.reload();
        }}>Log in</button>);

    function checkLogIn() {
        if (localStorage.getItem('username')) {
            dispatch({ type: 'LOGIN' })
        } else {
            dispatch({ type: 'LOGOUT' });
        }
    }

    useEffect(checkLogIn, []);
    let buttons = [];
    if (isLoggedin) {
        buttons = <UserIcon />;
    } else {
        buttons = [logInBtn, favBtn, postBtn];
    }


    return (
        <div id="navBar">
            <button id="home" onClick={() => navigate('/')}>HOME</button>
            {buttons}
        </div>
    );
}
