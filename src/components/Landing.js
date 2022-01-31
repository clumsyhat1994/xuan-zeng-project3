import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SearchBar from "./SearchBar";
export default function Landing() {


    return (
        <>
            <h1>SUPER AWESOME JOB BOARD</h1>
            <SearchBar />
            <div id='note'>Dear visitor --  in order to update or delete a job, you have to be its creator.
                You can try posting a job, or login with username: zengxuan/password: zengxuan to update or delete the job titled 'Sales Engineer'.
                <br />This web app is just a student project, not a real job board.
            </div>
        </>
    );
}