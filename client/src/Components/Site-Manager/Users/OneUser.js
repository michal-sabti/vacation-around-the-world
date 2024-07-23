import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import "./oneUser.scss";
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import { changActiveUser, showAllUsers } from '../../../Store/Services/user';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@mui/material';

export default function OneUser({ user }) {

    const name = user.name;
    const email = user.email;
    const kind = user.kindUser;
    const [active, setActive] = React.useState(user.activeId);
    console.log(user)

    let message = "";
    let kindUser = "";

    if (kind == 1)
        kindUser = "משתמש רגיל";
    else if (kind == 2) kindUser = "בעל אטרקציה";

    if (active == 1)
        message = "התבטלה חסימת המשתמש !";

    else if (active == 2)
        message = "משתמש נחסם !";

    const [open, setOpen] = React.useState(false);

    const lock = (id) => {
        changActiveUser(id).then(res => {
            // console.log(res)
            setOpen(true);
            if (active == 1)
                setActive(2);
            else
                setActive(1)
            // console.log(user.activeId)
        }).catch(err => err.message);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        {kind != 3 ?
            <Card>
                <AccountCircleIcon fontSize="large" />
                <div style={{ display: "flex", justifyContent: "center" }} >
                    <CardHeader title={name} subheader={email} />
                </div>

                <CardContent>
                    <Typography variant="body2">{kindUser}</Typography>
                    <Snackbar
                        open={open}
                        onClose={handleClose}
                        message={message}
                        id="massage"
                    /><IconButton onClick={() => lock(user.id)}>{
                        active == 1 ? <LockOpenIcon /> : <NoEncryptionGmailerrorredIcon />
                    }</IconButton>
                </CardContent>
            </Card> : null
        }
    </>
    );
}