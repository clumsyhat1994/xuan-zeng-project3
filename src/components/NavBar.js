import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
export default function () {
    const isLoggedin = useSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = localStorage.getItem('username');
    const postBtn = (<button id="post_job" onClick={() => navigate('/postJob')}>Post job</button>);
    const isLoggedInBtn =
        (<button type="button" onClick={() => {
            axios.get('/api/user/isLoggedIn')
                .then(response => console.log('Username logged in: ' + response.data))
                .catch(err => console.log(err));
        }}>isLoggedIn</button>);
    const signUpBtn =
        (<button type="button" key='signup' onClick={() => {
            navigate('/register');
        }}>Sign up</button>);
    const logInBtn =
        (<button type="button" key='login' onClick={() => {
            navigate('/login');
        }}>Log in</button>);
    const logOutBtn =
        (<button type="button" key='logout' onClick={() => {
            axios.post('/api/user/logout')
                .then(() => {
                    localStorage.removeItem('username');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/');
                })
                .catch(console.error)
        }}>Log out</button>);


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
        buttons = [logOutBtn, postBtn];
    } else {
        buttons = [logInBtn, signUpBtn];
    }


    return (
        <div id="navBar">
            <button id="home" onClick={() => navigate('/')}>HOME</button>
            <span>{username}</span>
            {buttons}
            <button id="post_job" onClick={() => navigate('/myFav')}>Favorites</button>
        </div>
    );
}
