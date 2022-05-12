import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Snippet from "./Snippet";
import JobDetail from "./JobDetail";
export default function SearchResult() {
    const keyword = useParams().keyword
    const [searchResults, setSearchResults] = useState([]);
    const [otherResults, setOtherResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [fewResults, setFewResults] = useState(false);
    const [displayID, setDisplayID] = useState('');
    const filters = useSelector(state => state.filters);
    useEffect(searchJobs, [keyword, filters]);

    function searchJobs() {

        axios.get('/api/job/search/' + keyword, {
            params: {
                workplaceFilterString: filters.workplace + '',
                employmentTypeFilterString: filters.employmentType + ''
            }
        })
            .then(response => {
                setSearchResults(response.data);
                (response.data.length === 0) ? setNoResults(true) : setNoResults(false)
                if (response.data.length >= 5) setFewResults(false);
                else {
                    setFewResults(true);
                    const result = response.data.map((job) => job.job_title);
                    return axios.get('/api/job/', {
                        params: {
                            names: result + ''
                        }
                    });
                }
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

    useEffect(() => {
        if (searchResults.length !== 0) setDisplayID(searchResults[0]._id)
    }, [searchResults])

    const resultList = [];
    for (let i in searchResults) {
        resultList.push(
            <Snippet key={'snippet' + i} id={searchResults[i]._id} job_title={searchResults[i].job_title}
                company_name={searchResults[i].company_name} location={searchResults[i].location} setDisplay={setDisplayID} />
        );
    }

    const otherResultList = [];
    for (let i in otherResults) {
        otherResultList.push(
            <Snippet key={'snippet' + i} id={otherResults[i]._id} job_title={otherResults[i].job_title}
                company_name={otherResults[i].company_name} location={otherResults[i].location} setDisplay={setDisplayID} />
        );
    }
    return (
        <>
            <div id="searchResults">
                <h3>{noResults ? 'Nothing found for keyword: ' + keyword : ''}</h3>
                {resultList}
                <h4>{fewResults ? '——————Check out other job listings——————' : ''}</h4>
                {otherResultList}
            </div>

            {searchResults.length !== 0 && <JobDetail id={displayID == '' ? null : displayID} />}
        </>
    );
}

/**
 *             <div id="searchResults">
                <h3>{noResults ? 'Nothing found for keyword: ' + keyword : ''}</h3>
                {resultList}
                <h4>{fewResults ? '——————Check out other job listings——————' : ''}</h4>
                {otherResultList}
            </div>

            <JobDetail />
 */
