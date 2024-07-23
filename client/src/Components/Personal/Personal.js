import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

import "../../app.scss";

export const Personal = () => {
    // console.log(" --------------- אזור אישי -----------------")
    const nav = useNavigate();

    return (<>
        <IconButton id="account" onClick={() => nav("/PersonalPlace")}>
            <AccountCircleIcon fontSize="large" />
        </IconButton>
    </>)
}