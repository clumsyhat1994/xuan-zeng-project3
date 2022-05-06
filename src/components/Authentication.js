import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default (props) => {
    let buttonText = '';
    let expressRoute = '';

    if (props.mode === 'login') {
        buttonText = 'Log in';
        expressRoute = '/api/user/login';
    } else if (props.mode === 'register') {
        buttonText = 'Sign up';
        expressRoute = '/api/user'
    }

    const location = useLocation();


    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        verify: ''
    });


    const dispatch = useDispatch();
    let fragment = (<></>);
    if (props.mode === 'register') {
        fragment = (
            <>
                <label htmlFor='verify'>Verify password</label>
                <input type='password' value={userData.verify} id='verify' onChange={(e) => {
                    setUserData({
                        ...userData,
                        verify: e.target.value
                    })
                }}></input>
            </>);
    }

    function handleClick() {
        if (props.mode === 'register' && userData.password !== userData.verify) {
            return setErrMsg('Passwords don\'t match');
        }
        axios.post(expressRoute, userData)
            .then(response => {
                console.log('You are logged in ' + response.data);
                setErrMsg('');
                localStorage.setItem('username', response.data);
                dispatch({
                    type: 'LOGIN'
                });
                navigate(location.state ? location.state.from : '/');
            })
            .catch(
                err => {
                    console.log("There's an error" + err.response);
                    setErrMsg(err.response.data);
                });
    }
    return (
        <div id='authentication'>
            <div id='errMsg'>{errMsg}</div>
            <label htmlFor='username'>Username</label>
            <input type='text' value={userData.username} name='username' id='username' onChange={(e) => {
                setUserData({
                    ...userData,
                    username: e.target.value
                });
            }}></input>
            <label htmlFor='password'>Password</label>
            <input type='password' value={userData.password} name='password' id='password' onChange={(e) => {
                setUserData({
                    ...userData,
                    password: e.target.value
                })
            }}></input>
            {fragment}
            <button type='button' onClick={handleClick}>{buttonText}</button>
            {props.mode === 'login' ?
                <div className='link' onClick={() => {
                    setErrMsg('');
                    navigate('/register', { state: { from: location.state.from } });
                }}>Don't have an account? Click here to sign up!</div>
                : <></>}
        </div>
    );
}