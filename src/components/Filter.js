import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Checkbox from "./Checkbox";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function Filter(props) {
    const workplaceTypes = ['On-site', 'Hybrid', 'Remote'];
    const employmentTypes = ['Full-time', 'Part-time', 'Internship', 'Volunteer'];
    const [workplaceFilter, setWorkPlaceFilter] = useState([]);
    const [employmentTypeFilter, setEmploymentTypeFilter] = useState([]);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const helper = (arr, setArr, toggledItem) => {
        const index = arr.indexOf(toggledItem);
        if (index === -1) {
            setArr([...arr, toggledItem])
        } else {
            const tmp = [...arr]
            tmp.splice(index, 1)
            setArr(tmp)
        }
    }


    const hideAndGet = (e) => {
        e.stopPropagation();
        setVisible(false);
        document.removeEventListener('click', hideAndGet)
    }

    if (visible) {
        document.addEventListener('click', hideAndGet);
    }
    const handleClick = () => {
        setVisible(false);
        if (props.type === 'employment-type') dispatch({ type: 'SETEMPLOYMENTTYPE', payload: employmentTypeFilter })
        else if (props.type === 'workplace') dispatch({ type: 'SETWORKPLACE', payload: workplaceFilter })
    }

    const workplaceList = (props.type === 'workplace') && (
        <ul>
            {workplaceTypes.map((type) => {
                return (<li key={type}><Checkbox type={type} checked={workplaceFilter.indexOf(type) !== -1} toggleHelper={() => {
                    helper(workplaceFilter, setWorkPlaceFilter, type);
                }} /></li>)
            })}
        </ul>
    );

    const employmentTypeList = (props.type == 'employment-type') && (
        <ul>
            {employmentTypes.map((type) => {
                return (
                    <li key={type}><Checkbox type={type} checked={employmentTypeFilter.indexOf(type) !== -1} toggleHelper={() => {
                        helper(employmentTypeFilter, setEmploymentTypeFilter, type);
                    }} /></li>);
            })}
        </ul>
    )

    return (
        <div id="filter">
            <div className={"filterBtn"} onClick={(e) => {
                setVisible(!visible);
                e.stopPropagation();
            }}>{(props.type === 'workplace') && 'On-site/Remote'}{props.type === 'employment-type' && 'Full/Part time'}</div>

            {visible && (<div className={"filterMenu"} onClick={(e) => {

                e.stopPropagation();
            }}  >
                {workplaceList}
                {employmentTypeList}
                <div className="button" onClick={handleClick}>Confirm</div>
            </div>)}
        </div>
    );
}