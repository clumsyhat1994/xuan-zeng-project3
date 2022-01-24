import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Snippet from "./Snippet";
export default function SearchResult() {
    const keyword = useParams().keyword
    const [searchResults, setSearchResults] = useState([]);
    const [otherResults, setOtherResults] = useState([]);
    const [defaultMsg, setDefaultMsg] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(searchJobs, []);

    function searchJobs() {
        axios.get('/api/job/search/' + keyword)
            .then(response => {
                if (response.data.length === 0) {
                    setNoResults(true);
                    setDefaultMsg("Nothing found!");
                    return axios.get('/api/job/');
                }
                setSearchResults(response.data);
            })
            .then(response => {
                setOtherResults([...response.data])
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {

            });
    }

    const resultList = [];
    for (let i in searchResults) {
        resultList.push(
            <Snippet key={'snippet' + i} id={searchResults[i]._id} job_title={searchResults[i].job_title}
                company_name={searchResults[i].company_name} location={searchResults[i].location} />
        );
    }

    const otherResultList = [];
    for (let i in otherResults) {
        otherResultList.push(
            <Snippet key={'snippet' + i} id={otherResults[i]._id} job_title={otherResults[i].job_title}
                company_name={otherResults[i].company_name} location={otherResults[i].location} />
        );
    }
    return (
        <div id="searchResults">
            <h3>{noResults ? 'Nothing found for keyword: ' + keyword : ''}</h3>
            {resultList}
            <h4>{noResults ? '——————Check out other job postings——————' : ''}</h4>
            {otherResultList}
        </div>
    );
}