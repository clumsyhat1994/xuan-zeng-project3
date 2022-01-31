import React, { useState } from "react";
export default function Filter(props) {
    const [visible, setVisible] = useState(false);
    const ul = visible && (props.type === 'workplace') && (
        <ul className={visible ? '' : 'hidden'}>
            <li>
                <input type='checkbox' id="workplace1" />
                <label htmlFor="workplace1">On-site</label>
            </li>
            <li>
                <input type='checkbox' id="workplace1" />
                <label htmlFor="workplace1">Hybrid</label>
            </li>
            <li>
                <input type='checkbox' id="workplace1" />
                <label htmlFor="workplace1">Remote</label>
            </li>
        </ul>
    );
    return (
        <div id="filter">
            <div className="filterBtn" onClick={() => {
                //setVisible(!visible);
            }}>{(props.type === 'workplace') && 'On-site/Remote'}{props.type === 'employment-type' && 'Full/Part time'}</div>
            {ul}
        </div>
    );
}