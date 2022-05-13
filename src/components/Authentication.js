import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';


export default (props) => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [ready, setReady] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        verify: ''
    });
    const logInInputs = [
        {
            id: 'username',
            title: 'Username',
            type: 'text',
            errmsg: 'Please enter username',
            required: true
        },
        {
            id: 'password',
            title: 'Password',
            type: 'password',
            errmsg: 'Please enter password',
            required: true
        },
    ]
    const signUpInputs = [...logInInputs, {
        id: 'verify',
        title: 'Confirm password',
        type: 'password',
        errmsg: 'Passwords don\'t match',
        required: true,
        pattern: userData.password
    }]


    let inputs = []
    let buttonText = '';
    let expressRoute = '';


    const location = useLocation();
    if (location.pathname == '/login') {
        buttonText = 'Log in';
        expressRoute = '/api/user/login';
        inputs = logInInputs
    } else if (location.pathname == '/register') {
        buttonText = 'Sign up';
        expressRoute = '/api/user'
        inputs = signUpInputs
    }

    useEffect(() => {
        setErrMsg('')
        setReady(false)
    }, [location.pathname])

    const dispatch = useDispatch();
    /** 
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
    */
    function handleClick() {
        if (location.pathname === '/register' && userData.password !== userData.verify
            || userData.username.length == 0 || userData.password.length == 0) {
            return setReady(true)
            //return setErrMsg('Passwords don\'t match');
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

    function onChange(e) {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div id='authentication'>
            <div id='errMsg'>{errMsg}</div>

            {inputs.map((input) => {
                return <FormInput key={input.id} {...input} onChange={onChange} ready={ready} />
            })}


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

/**
 *     return (
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
 */