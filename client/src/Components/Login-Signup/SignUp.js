import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { saveUser } from '../../Store/Action/userAction';
import { signup } from "../../Store/Services/user";

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
import { HomePage } from "../HomePage";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";

export const SignUp = ({ isSingUp, setIsSingUp }) => {

    let { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onSubmit" });
    let dispatch = useDispatch();

    const save = (details) => {
        console.log(details);
        signup(details).then(res => {
            console.log(res.data.insertId)
            if (res.data.insertId != null) {
                dispatch(saveUser(res.data.insertId));
                Swal.fire("נרשמת בהצלחה");
            }
            //  של המשתמש החדש id שומר את ה
            else {
                Swal.fire(res.data.message);
            }
        }).catch(err => { console.log(err); Swal.fire("התרחשה שגיאה ") });

    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showPassword, setShowPassword] = React.useState(false);
    let user = useSelector((state) => state.user.currentUser);
    console.log(user)

    return <>
        <div>
            <Dialog
                open={isSingUp}
                onClose={() => setIsSingUp(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"הרשמה"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form onSubmit={handleSubmit(save)}>
                            <Box className={user != null ? "login" : "unLogin"} >
                                <FormControl className="form-login">
                                    <InputLabel>שם </InputLabel>
                                    <OutlinedInput
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        label="name"
                                        {...register("name", { minLength: 2, maxLength: 20, required: true })}
                                    />
                                    {/* && dirtyFields.name  */}
                                    {errors.name && errors.name.type == "required" && <div className="error"> שדה חובה*</div>}
                                    {errors.name?.type == "minLength" && <div className="error">  לפחות 2 תווים</div>}
                                    {errors.name?.type == "maxLength" && <div className="error"> מקסימום 20 תווים </div>}
                                </FormControl><br /><br />

                                <FormControl className="form-login" >
                                    <InputLabel>טלפון</InputLabel>
                                    <OutlinedInput
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        }
                                        label="Phone"
                                        {...register("phone", { required: true, minLength: 10 })}
                                    />
                                    {errors.phone && errors.phone.type == "required" && (<div className="error">שדה חובה*</div>)}
                                    {errors.phone && errors.phone.type == "minLength" && (<div className="error">מ *10 תווים</div>)}
                                    {/* לעשות בדיקה שהמספר תקין */}

                                </FormControl><br /><br />

                                <FormControl className="form-login" >
                                    <InputLabel>מייל</InputLabel>
                                    <OutlinedInput
                                        // type={showPassword ? 'password' : 'text'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <EmailIcon />
                                            </InputAdornment>
                                        }
                                        label="email"
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && errors.email.type == "required" && (<div className="error">שדה חובה*</div>)}
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
                                        {...register("password", { required: true, minLength: 6 ,pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,})}
                                    />
                                    {errors.password && errors.password.type == "required" && (<div className="error">שדה חובה*</div>)}
                                    {errors.password && errors.password.type == "minLength" && (<div className="error">   מינימום 6 תווים*</div>)}
                                    {errors.password && errors.password.type == "pattern"  && (<div className="error">   לפחות מספר אחד.ולפחות אות אחת באנגלית*</div>)}
                                </FormControl><br /><br />

                                <Button variant="contained" endIcon={<SendIcon />} type="submit"> הרשם </Button>
                            </Box>
                        </form >
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div >
        {/* {user != null && <HomePage />} */}
    </>
}