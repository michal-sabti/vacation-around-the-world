import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveUsers } from '../../../Store/Action/userAction';
import { showAllUsers } from '../../../Store/Services/user';
import OneUser from './OneUser';
import { Button, InputBase, Paper } from '@mui/material';
import { IconButton } from 'rsuite';
import SearchIcon from "@mui/icons-material/Search";


export default function ShowAllUsers() {

    let arrUsers = useSelector((state) => state.user.arr);
    console.log(arrUsers);
    let dispatch = useDispatch();

    let [inpSearch, setInpSearch] = React.useState("");
    let [showOwners, setShowOwners] = React.useState(false);
    let [showAll, setShowAll] = React.useState(true);
    let [showUsers, setShowUser] = React.useState(false);

    React.useEffect(() => {
        showAllUsers().then(res => {
            console.log(res.data)
            dispatch(saveUsers(res.data))
        }).catch(err => err.message);
    }, [])

    // const filter = (e) => {
    //     e.preventDefault();
    //     for (let i = 0; i < arrUsers.length; i++) {
    //         const user = arrUsers[i];
    //         if (user.email == inpSearch) {
    //             let userElement = document.getElementById(user.id);
    //             if (userElement) {
    //                 userElement.style.backgroundColor = 'pink'; // שנה לצבע שאתה רוצה
    //             }
    //         }
    //     }
    // };


    const showUser = (num) => {
        if (num == 1) {
            setShowOwners(false);
            setShowUser(true);
        }
        else {
            setShowOwners(true);
            setShowUser(false);
        }
        setShowAll(false);
    }
    const showAllOfTheUsers = () => {
        setShowOwners(false);
        setShowUser(false);
        setShowAll(true);
    }
    return (<>
        <h1>משתמשים רשומים</h1>

        {/* <Paper component="form" sx={{ p: "3px 5px" }} >
            <IconButton
                type="button"
                sx={{ p: "10px", color: " rgb(91, 125, 199)" }}
                aria-label="search"
                onClick={filter}
            >
                <SearchIcon />
            </IconButton>

            <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 18 }}
                placeholder=" חפש משתמש לפי מייל ... "
                onChange={(e) => setInpSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") filter(e);
                }}
            />
            <button id="button-search" onClick={filter}>חפש</button>
        </Paper> */}

        <div id="div-users">
            <li> <Button onClick={() => showAllOfTheUsers()}>הצג את כל המשתמשים </Button></li>
            <li> <Button onClick={() => showUser(1)}>הצג משתמשים רגילים</Button></li>
            <li> <Button onClick={() => showUser(2)}>הצג בעלי אטרקציה / מלון</Button></li>
        </div>

        <ul className="allUsers">

            {showAll && <h4> כל המשתמשים הרשומים </h4>}<br />
            {showAll && arrUsers.map(item => <li key={item.id} className="oneUser">
                <OneUser user={item} />
            </li>)}

            {showOwners && <h4> משתמשים בעלי אטרקציה / מלון </h4>}<br />
            {showOwners && arrUsers.filter(item => item.kindUser == 2).map(item => <li key={item.id} className="oneUser">
                <OneUser user={item} />
            </li>)}

            {showUsers && <h4 > משתמשים רגילים </h4>}<br />
            {showUsers && arrUsers.filter(item => item.kindUser == 1).map(item => <li key={item.id} className="oneUser">
                <OneUser user={item} />
            </li>)}
        </ul >
    </>)
}