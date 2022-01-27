import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
    const [searchContent, setSearchContent] = useState('');
    const navigate = useNavigate();
    return (
        <>
            <h1>A REAL JOB BOARD</h1>
            <div id='searchBar'>
                <input onChange={(e) => {
                    setSearchContent(e.target.value);
                }} />
                <button onClick={() => {
                    navigate('./searchResult/' + searchContent);
                }}>SEARCH</button>
            </div>
            <div id='note'>Dear visitor --  in order to update or delete a job, you have to be its creator.
                You can try posting a job, or login with username: zengxuan/password: zengxuan to update or delete the job titled 'Sales Engineer'. </div>
        </>
    );
}