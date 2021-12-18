import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Snippet from "./Snippet";
export default function SearchResult() {
    const keyword = useParams().keyword
    const [searchResults, setSearchResults] = useState('');
    const [defaultMsg, setDefaultMsg] = useState('');
    useEffect(searchJobs, []);

    function searchJobs() {
        axios.get('/api/job/search/' + keyword)
            .then(response => {
                if (response.data.length === 0) {
                    setDefaultMsg("Nothing found!");
                }
                setSearchResults(response.data);
            })
            .catch(err => {
                console.log(err)
            });

    }

    const resultList = [];
    for (let i in searchResults) {
        console.log(searchResults[i]._id);
        resultList.push(
            /*
            <div className="snippet" key={"snippet " + i} id={"snippet " + i} onClick={() => {
                console.log('click!!!')
                navigate('/jobDetail/' + searchResults[i]._id);
            }}>
                <div><strong>{searchResults[i].job_title}</strong></div>
                <div>{searchResults[i].company_name}</div>
                <div>{searchResults[i].location}</div>
                
            </div>
            */
            <Snippet key={'snippet' + i} id={searchResults[i]._id} job_title={searchResults[i].job_title}
                company_name={searchResults[i].company_name} location={searchResults[i].location} />
        );
    }

    //console.log('keyword ' + keyword);
    return (
        <div id="searchResults">
            <h1>{defaultMsg}</h1>
            {resultList}
        </div>
    );

}