import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import UserIcon from "./UserIcon";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { PromiseProvider } from "mongoose";
export default function (props) {
    const isLoggedin = useSelector(state => state.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const username = localStorage.getItem('username');
    const keyword = useParams().keyword;

    const favBtn = (<button id="fav_job" key="fav_job" onClick={() => navigate('/myFav')}>Favorites</button>);
    const postBtn = (<button id="post_job" key="post_job" onClick={() => navigate('/postJob/1')}>Post job</button>);

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
        buttons = [postBtn, favBtn, logInBtn];
    }


    return (
        <div id="navBar">
            <button id="home" onClick={() => navigate('/')}>HOME</button>
            <div id="navSearchContainer">
                {props.search && <SearchBar inNav={true} keyword={keyword} />}
                {props.search && keyword && <Filter type='workplace' key='workplace' />}
                {props.search && keyword && <Filter type='employment-type' key='employment-type' />}
            </div>

            <div id="navBtn">
                {buttons}
            </div>
        </div>
    );
}
