import { Avatar, Card, CardActions, CardHeader, IconButton, Rating, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import { AddLikeTocomment, RemoveLikeTocomment } from "../../../Store/Services/trip";
import * as React from 'react';
import '../Scss/trip.scss';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";



export default function HotelDetSingle({ item, sentReport, arr }) {

    const user = useSelector(state => state.user.currentUser);
    const [likeIcon, setLikeIcon] = React.useState(user && arr.find(x => x.userId == user.id && x.id == item.id) ? true : false);
    let name = item.name.charAt(0);

    const Like = (item) => {
        if (!likeIcon && !(arr.find(x => x.userId == user.id && x.id == item.id))) {
            setLikeIcon(!likeIcon);
            AddLikeTocomment(item.id);
            // setNumLike(numLike + 1);
        }
        else {
            setLikeIcon(!likeIcon);
            RemoveLikeTocomment(item.id);
            // setNumLike(numLike - 1);
        }
    }

    //שומר את תוכן הדיווח
    // const [text, setText] = React.useState('');
    // const handleChange = (event) => {
    //     setText(event.target.value);
    // };


    const handleOpen2 = async () => {
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: ' על מה ברצונך לדווח לגבי תגובה זו ?',
            inputPlaceholder: 'כתוב דיווח כאן ...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            console.log("item.id -----------------------------")
            console.log(item.id)
            sentReport(text, item.id);
        }
    }

    const notConnectedUser = () => {
        Swal.fire({
            icon: 'error',
            title: 'משתמש לא מחובר!'
        })
    }

    return (<>
        <Card className='card-comment'>
            <CardHeader
                avatar={<Avatar>{name}</Avatar>}
                title={item.name}
                subheader={<Rating name="size-medium" readOnly defaultValue={item.rankH} />}
            />
            <Typography className='desc-comment'>{item.Cdescription}</Typography>
            <CardActions sx={{ marginRight: 75 }}>
                <IconButton onClick={() => { if (user) Like(item) }}>
                    {!likeIcon ? <ThumbUpOutlinedIcon /> : <ThumbUpRoundedIcon />}
                </IconButton><p>{item.numLike}</p>

                <IconButton onClick={() => { user ? handleOpen2() : notConnectedUser() }} > <OutlinedFlagRoundedIcon /><p>דווח</p></IconButton>

                {/* <IconButton><AddAPhotoIcon /></IconButton> */}
            </CardActions>
        </Card>

    </>)
}