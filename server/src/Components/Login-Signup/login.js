
import './login.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from '../../Store/Action/userAction';
import { LogIn } from "../../Store/Services/user";

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Login = ({ isLogin, setIsLogin }) => {
    console.log("login")

    // let nav = useNavigate();
    let dis = useDispatch();
    let { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({ mode: "onSubmit" });

    // פונקצית התחברות - מתבצעת רק לאחר בדיקות התקינות
    const login = (user) => {

        console.log(user)
        LogIn(user).then(res => {
            if (res.data.user != null) {
                console.log(res.data.user)
                if(res.data.user.activeId==1){
                dis(saveUser(res.data.user));
                console.log(res)
                Swal.fire("שלום " + user.name + " ברוך/ה הבא/ה לחופשות מסביב לעולם !");
                setIsLogin(false);
                }
                else
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'משתמש חסום',
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
            else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'פרטייך שגויים',
                    showConfirmButton: false,
                    timer: 3000,
                });
                // Swal.fire({ icon: 'error', title: 'פרטייך שגויים', })
            }
        }).catch(err => Swal.fire({ icon: 'error', title: 'שגיאה ! ! !' }));
    };


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let user = useSelector((state) => state.user.currentUser);

    return (<>
        <div>
            <Dialog
                open={isLogin}
                onClose={() => setIsLogin(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"התחברות"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form onSubmit={handleSubmit(login)} id="form-login">
                            <Box>
                                <FormControl className="form-login" >
                                    <InputLabel>שם</InputLabel>
                                    <OutlinedInput
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        label="name"
                                        {...register("name", { minLength: 2, maxLength: 20, required: true })}
                                    />
                                    {errors.name && dirtyFields.name && errors.name.type == "required" && <div className="error"> שדה חובה*</div>}
                                    {errors.name?.type == "minLength" && <div className="error">  לפחות 2 תווים</div>}
                                    {errors.name?.type == "maxLength" && <div className="error"> מקסימום 20 תווים </div>}
                                </FormControl><br /><br />

                                <FormControl className="form-login" >
                                    <InputLabel>סיסמה</InputLabel>
                                    <OutlinedInput
                                        type={showPassword ? 'password' : 'text'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        {...register("password", { required: true })}
                                    />
                                    {errors.password && errors.password.type == "required" && (<div className="error">שדה חובה*</div>)}
                                </FormControl><br /><br />

                                <Button variant="contained" className="submit" endIcon={<SendIcon />} type="submit"> התחבר </Button>
                            </Box>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div >
    </>)
}
