import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import RoomIcon from "@mui/icons-material/Room";
import {
  AddLikeTocomment,
  AddTripCommentToDB,
  GetAllFeedback,
  GetCommenterName,
  RemoveLikeTocomment,
} from "../../../Store/Services/trip";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import "../Scss/trip.scss";
import { useNavigate } from "react-router-dom";
import { GetCityByCityId } from "../../../Store/Services/city";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Rating from "@mui/material/Rating";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardHeader,
  IconButton,
  Modal,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import tripDetSingl from "./tripDetSingle";
import TripDetSingl from "./tripDetSingle";
import { AddReport } from "../../../Store/Services/siteManager";
import Swal from "sweetalert2";
import { Wash } from "@mui/icons-material";
import { Input, Stack } from "rsuite";

import AddCommentIcon from "@mui/icons-material/AddComment";
import withReactContent from "sweetalert2-react-content";
import { fontGrid } from "@mui/material/styles/cssUtils";
import { GetAllCuntries } from "../../../Store/Services/country";
const MySwal = withReactContent(Swal);

const TripDetails = () => {
  const trip = useSelector((state) => state.trip.selectedTrip);
  const user = useSelector((state) => state.user.currentUser);
  let [city, setCity] = React.useState(
    useSelector((state) => state.city.currentCity)
  );
  let [country, setCountry] = React.useState(
    useSelector((state) => state.country.currentCountry)
  );
  let [arrcountry, setArrCountry] = React.useState(
    useSelector((state) => state.country.arrCountries)
  );

  const [comment, setComment] = React.useState("");
  const [rank, setRank] = React.useState(2);

  React.useEffect(() => {
    if (country == null) {
      GetAllCuntries().then((res) => {
        setArrCountry(res.data);
      }).catch((err) => err.message);

      let c = arrcountry.filter((item) => { return (item.id = city.countryId); });
      setCountry(c);
      console.log(country);
    }

  }, [country]);

  let img = trip.pic ? trip.pic : "pic/image.jpg";

  console.log(img);
  let place = trip.location;
  console.log(place);
  let [arrFidback, setArrFidback] = React.useState([]);
  const nav = useNavigate();
  let [numLike, setNumLike] = React.useState();
  const prevArr = React.useRef();

  // console.log(trip)
  React.useEffect(() => {
    if (arrFidback && JSON.stringify(arrFidback) != JSON.stringify(prevArr)) {
      GetAllFeedback(trip.id).then((res) => {
        console.log(res.data);
        setArrFidback(res.data);
      }).catch((err) => err.message);
    }
  }, [arrFidback]);


  const sentReport = (report, comment) => {
    console.log(report);
    console.log(comment);
    AddReport(user.id, report, trip.id, comment);

    Swal.fire({
      icon: "success",
      title: "הדיווח נשלח בהצלחה!",
    });
  };

  const AddComment = () => {
    if (user && trip && rank && comment)
      AddTripCommentToDB({
        userId: user.id,
        tripId: trip.id,
        description: comment,
        rank,
      })
        .then((x) => { console.log(x.data); Swal.fire("תגובתך נוספה"); })
        .catch((error) => console.log("Failed to add comment:", error));

    console.log(user.id, trip.id, comment, rank);
    setComment("");
  };

  const notConnectedUser = () => {
    Swal.fire({
      icon: "error",
      title: "משתמש לא מחובר!",
    });
  };
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
      {console.log(country)}
      {trip && (
        <Card id="card-details">
          <CardMedia component="img" height="400" image={img} />
          <CardContent>
            <Typography gutterBottom variant="h4" className="title">
              <b>{trip.tripName}</b>
            </Typography>
            <Typography id="full-details">
              <h3><b>{country?.name} ← {city?.name}</b></h3>
              <h4><RoomIcon /> מיקום -- {trip.location}</h4><br />
              <h4>{trip.description}</h4> <br /><br />
              <h5> מחיר למבוגר - {trip.price}</h5>
              <h5> מחיר לילד (עד גיל 10) - {trip.childPrice}</h5> 
            </Typography>

            {trip.price != 0 ? (
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  id="search-trip"
                  onClick={() => {
                    user
                      ? nav("/stepperTrip", { state: { trip } })
                      : Swal.fire({
                        icon: "error",
                        title: "משתמש לא מחובר !",
                      });
                  }}
                >
                  {" "} הזמן עכשיו »{" "}
                </Button>{" "}
              </Stack>
            ) : null}

            <h3>
              <TravelExploreIcon /> מיקום במפה{" "}
            </h3>
            <iframe
              className="fram"
              src={`https://www.google.com/maps/embed/v1/place?q=${trip.location}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
            ></iframe>

            <h3>תגובות האנשים שביקרו במקום</h3>
            <input
              placeholder="נא להוסיף תגובה ..."
              className="addComment"
              value={comment}
              onChange={handleInputChange}
            />

            <IconButton
              onClick={() => {
                user ? AddComment() : notConnectedUser();
              }}
              className="icon-button"
            >
              <AddCommentIcon />
            </IconButton>
            <Box sx={{ "& > legend": { mt: 2 }, direction: "ltr" }}>
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

            {/* {arrFidback ? arrFidback.map((item) => (
              <div key={item.id}>
                {setNumLike(item.numLike)}
                {item.tripId == trip.id ? (
                  <TripDetSingl
                    arr={arrFidback}
                    item={item}
                    sentReport={sentReport}
                  />) : null}
              </div>
            )) : null} */}

            {arrFidback ? [...arrFidback].reverse().map(item => <div key={item.id} >
              {item.tripId == trip.id ?
                <TripDetSingl arr={arrFidback} item={item} sentReport={sentReport} />
                : null}</div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default TripDetails;
