import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Checkbox from "./Checkbox";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FilterMenu from "./FilterMenu";
export default function Filter(props) {

    const [visible, setVisible] = useState(false);
    return (
        <div id="filter">
            <div className={"filterBtn"} onClick={(e) => {
                setVisible(!visible);
            }}>{(props.type === 'workplace') && 'On-site/Remote'}{props.type === 'employment-type' && 'Full/Part time'}</div>

            {visible && <FilterMenu visible={visible} setVisible={setVisible} type={props.type} />}
        </div>
    );
}