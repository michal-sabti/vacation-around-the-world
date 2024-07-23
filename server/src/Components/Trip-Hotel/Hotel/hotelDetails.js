import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import RoomIcon from '@mui/icons-material/Room';
import { AddLikeTocomment, AddTripCommentToDB, GetAllFeedback, GetCommenterName, RemoveLikeTocomment } from '../../../Store/Services/trip';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import "../Scss/trip.scss";
import { useNavigate } from 'react-router-dom';
import { GetCityByCityId } from '../../../Store/Services/city';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Rating from '@mui/material/Rating';
import { Avatar, Box, Button, CardActions, CardHeader, IconButton, Modal } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import { AddReport } from '../../../Store/Services/siteManager';
import Swal from 'sweetalert2';
import { Wash } from '@mui/icons-material';
import { Input, Stack } from 'rsuite';

import AddCommentIcon from '@mui/icons-material/AddComment';
import withReactContent from 'sweetalert2-react-content';
import { fontGrid } from '@mui/material/styles/cssUtils';
import HotelDetSingle from './hotelDetSingle';
import { AddHotelCommentToDB, AddHotelReport, GetAllHotelFeedback } from '../../../Store/Services/hotel';

const MySwal = withReactContent(Swal);

const HotelDetails = () => {

    const hotel = useSelector(state => state.hotel.selectedHotel);
    const user = useSelector(state => state.user.currentUser);
    let [city, setCity] = React.useState(useSelector(state => state.city.currentCity))
    let [country, setCountry] = React.useState(useSelector(state => state.country.currentCountry));

    const [comment, setComment] = React.useState("");
    const [rank, setRank] = React.useState(2);

    let img = hotel.pic ? hotel.pic : 'pic/image.jpg';

    // console.log(img)
    let place = hotel.location;
    // console.log(place)
    let [numLike, setNumLike] = React.useState();
    let [arrFidback, setArrFidback] = React.useState([]);
    const nav = useNavigate();

    // console.log(hotel)
    React.useEffect(() => {
        GetAllHotelFeedback(hotel.id).then(res => {
            console.log(res.data)
            setArrFidback(res.data)
        }).catch(err => err.message);
    }, [arrFidback]);
    

    const sentReport = (report, comment) => {
        console.log(report)
        console.log(comment)
        AddHotelReport(user.id, report, hotel.id, comment);

        Swal.fire({
            icon: 'success',
            title: 'הדיווח נשלח בהצלחה!',
        })
    }


    const AddComment = () => {
        if (user && hotel && rank && comment)
            AddHotelCommentToDB({ userId: user.id, hotelId: hotel.id, description: comment, rank })
                .then((x) => {
                    console.log(x.data);
                    Swal.fire("תגובתך נוספה");
                })
                .catch((error) => console.log("Failed to add comment:", error));

        console.log(user.id, hotel.id, comment, rank);
        setComment("");
    };


    const notConnectedUser = () => {
        Swal.fire({
            icon: 'error',
            title: 'משתמש לא מחובר!'
        })
    }
    const handleInputChange = (event) => {
        console.log(event.target.value)
        setComment(event.target.value);
    };

    return (<>{hotel &&
        <Card id="card-details">
            <CardMedia
                component="img"
                height="400"
                image={img}
            />
            <CardContent>

                <Typography gutterBottom variant="h4" className='title'>
                    <b>{hotel.hotelName}</b>
                </Typography>
                <Typography id="full-details">
                    <h3><b>{country?.name} ← {city?.name}</b></h3>
                    <h4><RoomIcon /> מיקום -- {hotel.location}</h4><br />
                    <h4>{hotel.description}</h4><br />
                </Typography>

                {/* הזמנה */}
                <Stack spacing={2} direction="row">
                    <Button variant="contained" id="search-trip"
                        onClick={() => {
                            user ? nav('/stepperHotel', { state: { hotel } })
                                : Swal.fire({
                                    icon: 'error',
                                    title: 'משתמש לא מחובר !'
                                })
                        }}> הזמן עכשיו » </Button>  </Stack>

                <h3><TravelExploreIcon />  מיקום במפה </h3>
                <iframe className='fram' src={`https://www.google.com/maps/embed/v1/place?q=${hotel.location}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>

                <h3>תגובות האנשים שביקרו במקום</h3>
                <input
                    placeholder="נא להוסיף תגובה ..."
                    className='addComment'
                    value={comment}
                    onChange={handleInputChange}
                />

                <IconButton onClick={() => { user ? AddComment() : notConnectedUser() }} className='icon-button'><AddCommentIcon /></IconButton>
                <Box sx={{ '& > legend': { mt: 2 }, direction: 'ltr' }}>
                    <Rating
                        name="simple-controlled"
                        onChange={(event, newValue) => {
                            setRank(newValue);
                        }}
                        value={rank}
                    />
                    <b> - הדירוג שלך </b>
                    {/* להוסיף אפשרות להעלאת תמונות */}
                    {/* <IconButton className='icon-button'><AddCommentIcon /></IconButton> */}
                </Box>

                {arrFidback ? [...arrFidback].reverse().map(item => <div key={item.id} >
                    {item.hotelId == hotel.id ?
                        <HotelDetSingle arr={arrFidback} item={item} sentReport={sentReport} />
                        : null}</div>
                ) : null}
            </CardContent>
        </Card >}
    </>)
}
export default HotelDetails;