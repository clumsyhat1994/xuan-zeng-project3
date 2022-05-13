import React, { useState } from "react";
export default function FormInput(props) {
    const [readyForVal, setReadyForVal] = useState(false)
    //console.log('ready: ' + props.ready)
    return (
        <>
            <label htmlFor={props.id}>{props.title}</label>
            <input {...props}
                onBlur={() => {
                    setReadyForVal(true)
                }}></input>
            <div className="errMsg" ready={props.ready || readyForVal.toString()}>{props.errmsg}</div>
        </>
    );
}//type={props.type} id={props.id} value={props.job_title} onChange={props.handleChange} ready={readyForVal}