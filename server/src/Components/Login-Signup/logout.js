import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../Store/Action/userAction';
import "../../app.scss";
import { useNavigate } from 'react-router-dom';


export const Logout = () => {
    let user = useSelector((state) => state.user.currentUser);
    let nav = useNavigate();
    let dis = useDispatch();
    const logout = () => {
        // console.log(user) 
        dis(saveUser(null));
    }
    
    return (<>
        <IconButton id="logout" onClick={() => logout()}>
            <LogoutIcon fontSize="large" />
        </IconButton>
    </>)
}