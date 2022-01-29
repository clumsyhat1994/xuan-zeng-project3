import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
    const [searchContent, setSearchContent] = useState('');
    const navigate = useNavigate();
    const handleEnter = (e) => {
        if (e.key === 'Enter' && searchContent) {
            navigate('./searchResult/' + searchContent);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEnter)
        return () => { document.removeEventListener('keydown', handleEnter) };
    });

    return (
        <>
            <h1>A REAL JOB BOARD</h1>
            <div id='searchBar'>
                <input onChange={(e) => {
                    setSearchContent(e.target.value);
                }} />
                <span className="material-icons" onClick={() => {
                    if (!searchContent) return;
                    navigate('./searchResult/' + searchContent);
                }}>search</span>
            </div>

            <div id='note'>Dear visitor --  in order to update or delete a job, you have to be its creator.
                You can try posting a job, or login with username: zengxuan/password: zengxuan to update or delete the job titled 'Sales Engineer'. </div>
        </>
    );
}