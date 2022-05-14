import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router';
export default function FormInput(props) {
    const [readyForVal, setReadyForVal] = useState(0)
    const location = useLocation();
    useEffect(() => {
        setReadyForVal(false)
    }, [location.pathname])
    //console.log('ready: ' + readyForVal)
    console.log(props.ready | readyForVal)
    return (
        <>
            <label htmlFor={props.id}>{props.title}</label>
            <input {...props}
                onBlur={() => {
                    setReadyForVal(1)
                }}></input>
            <div className="errMsg" ready={(props.ready | readyForVal).toString()}>{props.errmsg}</div>
        </>
    );
}//type={props.type} id={props.id} value={props.job_title} onChange={props.handleChange} ready={readyForVal}