import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import RoomIcon from '@mui/icons-material/Room';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "../Scss/trip.scss";
import { selectedTrip } from "../../../Store/Action/tripAction";
import { AddLikeHotel } from '../../../Store/Services/filter';
import { RssFeed } from '@mui/icons-material';
import { selectedHotel } from '../../../Store/Action/hotelAction';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function OneHotel({ myHotel }) {
    const nav = useNavigate();
    const dis = useDispatch();
    const nameT = myHotel.hotelName;
    const placeT = myHotel.location;
    const icon = <RoomIcon />;
    const picT = myHotel.pic ? myHotel.pic : "./pic/image.jpg";
    let user = useSelector((state) => state.user.currentUser);
    const expanded = false;
    // const [expanded, setExpanded] = React.useState(false);
    const addToFavorite = () => {
        console.log(myHotel)
        console.log(user);

        if (user != null) {
            const details = {
                hotelId: myHotel.id,
                userId: user.id
            }
            AddLikeHotel(details).then(res => {
                console.log(res)
            }).catch(err => err.message);
        }
    }


    return (
        <Card id="card">
            <div id="CardHeader" style={{ display: "flex", justifyContent: "center" }}>
                <CardHeader title={nameT} subheader={placeT} />
                <RoomIcon />
            </div>
            <CardMedia
                component="img"
                height="200"
                image={picT}
            />

            <CardActions disableSpacing>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={() => { addToFavorite() }} />
                <ExpandMore
                    onClick={() => {
                        nav("/hotelDetails")
                        dis(selectedHotel(myHotel))
                    }}
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    );
}