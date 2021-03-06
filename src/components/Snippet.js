import React from "react";
import { useNavigate } from "react-router";
export default function Snippet(props) {
    const navigate = useNavigate();
    return (
        <div className="snippet" onClick={() => {
            props.setDisplay('')
            setTimeout(() => { props.setDisplay(props.id) }, 1)
            //navigate('/jobDetail/' + props.id);
        }}>
            <div><strong>{props.job_title}</strong></div>
            <div>{props.company_name}</div>
            <div>{props.location}</div>
        </div>
    );
}
/**
 * <div><strong>{props.job_title}</strong></div>
            <div>{props.company_name}</div>
            <div>{props.location}</div>
 */