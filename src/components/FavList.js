import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Snippet from "./Snippet";
export default function SearchResult() {
    const navigate = useNavigate();
    const [defaultMsg, setDefaultMsg] = useState('');
    const [favList, setFavList] = useState([]);

    useEffect(checkLoggedIn, []);
    useEffect(getList, []);

    function checkLoggedIn() {
        if (!localStorage.getItem('username')) navigate('/login', { state: { from: '/myFav' } });
        /** 
        axios.get('/api/user/isLoggedIn')
            .then(response => { console.log('Username logged in: ' + response.data) })
            .catch((err) => {
                navigate('/login')
                console.log(err)
            });*/
    }


    function getList() {
        let username = localStorage.getItem('username')
        if (username) {
            axios.get('/api/user/favList/' + username)
                .then((res) => {
                    if (res.data.favorites.length === 0) {
                        setDefaultMsg("You haven't liked any job posts yet!");
                    }
                    setFavList(res.data.favorites);
                })
                .catch(e => console.log(e));
        }
    }

    const resultList = [];
    for (let i in favList) {
        resultList.push(
            <Snippet key={'snippet' + i} id={favList[i]._id} job_title={favList[i].job_title}
                company_name={favList[i].company_name} location={favList[i].location} />
        );
    }

    return (
        <div id="searchResults">
            <h1>{defaultMsg}</h1>
            {resultList}
        </div>
    );

}