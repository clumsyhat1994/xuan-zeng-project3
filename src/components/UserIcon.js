import React, { useState, useEffect } from "react";
import user from '../resource/google-user-icon-12.jpg'
import UserMenu from "./UserMenu";
export default function UserIcon(props) {
    const [isOn, setIsOn] = useState(false);

    const handleClick = function (e) {
        e.stopPropagation();
        setIsOn(!isOn);
    }
    const hide = function () {
        setIsOn(false);
    }
    useEffect(() => {
        document.addEventListener('click', hide)
    });
    return (
        <div id="userIcon" onClick={handleClick}>
            <img src={user} />
            {isOn && (<UserMenu></UserMenu>)}
        </div>

    );
}