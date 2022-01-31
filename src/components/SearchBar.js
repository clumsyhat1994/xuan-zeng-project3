import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function SearchBar(props) {
    const [searchContent, setSearchContent] = useState('');
    const navigate = useNavigate();
    const handleEnter = (e) => {
        if (e.key === 'Enter' && searchContent) {
            navigate('/searchResult/' + searchContent);
        }
    }

    useEffect(() => {
        if (props.keyword) setSearchContent(props.keyword)
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleEnter)
        return () => { document.removeEventListener('keydown', handleEnter) };
    });

    return (
        <div className={props.inNav && 'navSearchBar'} id={'searchBar'}>
            <input value={searchContent} onChange={(e) => {
                setSearchContent(e.target.value);
            }} />
            <span className="material-icons" onClick={() => {
                if (!searchContent) return;
                navigate('/searchResult/' + searchContent);
            }}>search</span>
        </div>

    );
}