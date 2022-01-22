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
        </>
    );
}