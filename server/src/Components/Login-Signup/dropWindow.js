
import { Link, useNavigate } from "react-router-dom";
import "./dropWindow.scss";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import IconButton from '@mui/material/IconButton';
import { MenuItem, Select } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { saveUser } from "../../Store/Action/userAction";
import Swal from "sweetalert2";

import { useState } from "react";
import { SignUp } from "./SignUp";
import { Login } from "@mui/icons-material";


export const DropWindow = ({ setIsLogin, setIsSingUp }) => {
    const [state, setState] = React.useState({ right: false });
    const nav = useNavigate();

    const toggleDrawer =
        (anchor, open) =>
            (event) => {
                if (
                    event.type === 'keydown' &&
                    ((event).key === 'Tab' ||
                        (event).key === 'Shift')
                ) {
                    return;
                }
                setState({ ...state, [anchor]: open });
            };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider />
            <List>
                <MenuItem onClick={() => setIsLogin(true)}><b>התחברות</b></MenuItem>
                <MenuItem onClick={() => setIsSingUp(true)}><b>הרשמה</b></MenuItem>

                <IconButton onClick={() => logout()}>
                    <LogoutIcon fontSize="large" />
                </IconButton>
            </List>
        </Box>)


    let dis = useDispatch();
    const logout = () => {
        // console.log(user)
        dis(saveUser(null));
        nav("/home")
        Swal.fire("התנתקת מהמערכת")
        // console.log(user)
    }


    return (<>
        <div>
            {(['right']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} id="icon"><DensityMediumIcon fontSize="large" /></Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    </>)
}

