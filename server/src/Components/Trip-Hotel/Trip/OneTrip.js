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

import { RssFeed } from '@mui/icons-material';
// import { DeleteTrip } from '../../../Store/Services/cityManager';
import { AddLikeTrip } from '../../../Store/Services/filter';
import { selectedTrip } from '../../../Store/Action/tripAction';

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

export default function OneTrip({ myTrip }) {

  const nav = useNavigate();
  const dis = useDispatch();
  // const useSelec = useSelector(state => state.trip.selectedTrip);
  const nameT = myTrip.tripName;
  const placeT = myTrip.location;
  const icon = <RoomIcon />;
  const picT = myTrip.pic ? myTrip.pic : "./pic/image.jpg";


  let user = useSelector((state) => state.user.currentUser);
  const expanded = false;
  // const [expanded, setExpanded] = React.useState(false);
  const addToFavorite = () => {

    if (user != null) {
      const details = {
        tripId: myTrip.id,
        userId: user.id
      }
      AddLikeTrip(details).then(res => {
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
        {/* <IconButton onClick={() => { addToFavorite() }}><FavoriteBorder /><Favorite /> </IconButton> */}
        <ExpandMore
          onClick={() => {
            nav("/tripDetails")
            dis(selectedTrip(myTrip))
          }}
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>

      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" >
        <CardContent> פרטים מלאים רק למשתמש רשום !
          לך להרשם !!!!
          {/* לשלוח לפנק שבודקת אם המשתמש רשום אם כן מראה לו פרטים מלאים אם לא צריך להירשם */}
      {/* </CardContent>
      </Collapse> */}
    </Card>
  );
}