import { PromiseProvider } from "mongoose";
import React, { useState, useEffect } from "react";
export default function Checkbox(props) {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (props.checked) setChecked(true);
    })
    const handleChange = () => {
        setChecked(!checked);
        props.toggleHelper();
    }

    return (
        <>
            <input type='checkbox' id={props.type} onChange={handleChange} checked={checked} />
            <label htmlFor={props.type}>{props.type}</label>
        </>);
}