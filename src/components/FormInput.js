import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router';
export default function FormInput({ ready, ...props }) {
    const [readyForVal, setReadyForVal] = useState(false)
    const location = useLocation();
    useEffect(() => {
        setReadyForVal(false)
    }, [location.pathname])
    //console.log('ready: ' + readyForVal)
    //console.log('ready: ' + props.ready || readyForVal.toString())
    return (
        <>
            <label htmlFor={props.id}>{props.title}</label>
            <input {...props}
                onBlur={() => {
                    setReadyForVal(true)
                }}></input>
            <div className="errMsg" ready={(ready || readyForVal).toString()}>{props.errmsg}</div>
        </>
    );
}//type={props.type} id={props.id} value={props.job_title} onChange={props.handleChange} ready={readyForVal}