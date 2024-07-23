import React, { useState } from "react"
import { DeleteTrip, GetCityByCityManager, GetHotelByIdOwner, GetTripByIdOwner } from "../../Store/Services/ownerHotelAndAttraction"
import { useDispatch, useSelector } from "react-redux"
import { editTrip, saveCity, saveTrips } from "../../Store/Action/tripAction";
import OneTrip from "../Trip-Hotel/Trip/OneTrip";
import "../Trip-Hotel/Scss/trip.scss";
import "../Owner-Attraction/showAllTrip.scss";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RoomIcon from '@mui/icons-material/Room';
import { useNavigate } from "react-router-dom";
import { saveHotels } from "../../Store/Action/hotelAction";

export default function ShowAllTrip() {
  const nav=useNavigate();
  let dispatch = useDispatch();

    let user = useSelector(state => state.user.currentUser);
    // let triparr = useSelector(state => state.trip.tripArr);
    // let hotelarr = useSelector(state => state.hotel.hotelArr);
    let [triparr,setTripArr]=useState([]);
    let [hotelarr,setHotelarr]=useState([]);

    
    let active = triparr.filter(item => { return item.activeId === 1 });
    active =active.concat(hotelarr?.filter(item => { return item.activeId === 1 }));
    console.log(active)
    let notActive = triparr.filter(item => { return item.activeId === 2 });
    console.log(notActive,"after trip")
    if(notActive.length>0)
    notActive =notActive.concat(hotelarr?.filter(item => { return item.activeId === 2 }));
    console.log(notActive,hotelarr);

    
  
    
    React.useEffect(() => {
        console.log(user)
        GetTripByIdOwner(user.id).then(res => {
            console.log(res.data)
            // dispatch(saveTrips(res.data))
            setTripArr(res.data)
        }).catch(err => err.message);
    }, [])

    React.useEffect(() => {
      console.log(user)
      GetHotelByIdOwner(user.id).then(res => {
          console.log(res.data)
          // dispatch(saveHotels(res.data));
          setHotelarr(res.data);
      }).catch(err => err.message);
  }, [])

    const DeleteTripById = (idTrip) => {
        console.log("trip", idTrip)
        DeleteTrip(idTrip).then(res => {
          console.log(res)
        }).catch(err => err.message);
      }
      const DeleteHotelById = (idTrip) => {
        console.log("hotel", idTrip)
        DeleteTrip(idTrip).then(res => {
          console.log(res)
        }).catch(err => err.message);
      }
    return <>
        <h3>פעיל</h3>
        <ul className="ul-trip" id="active">
          {console.log(active)}
            {active.map(item => <li key={item.id} className="li-trip">
            <Card sx={{ maxWidth: 355, height:300}}>
      <CardMedia
        sx={{ height: 150 }}
        
        image={item.pic.length>0?item.pic[0]:"./pic/image.jpg"}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
        {item.type=='trip'?item.tripName:item.hotelName}
        </Typography>
       
      </CardContent>
      <CardActions className="cardAction">
        <Button onClick={()=>nav('/chooseDate',{state: { id: item.id,}})}>צפייה בהזמנות</Button>
        <Button id="edit" onClick={()=>{dispatch(editTrip(item));item.type=='trip'?nav('/AddEndEditAttraction/${user.id}'):nav('/AddEndEditHotel/${user.id}')}}><EditIcon/></Button>
      <Button id="delete" onClick={() => item.type=='trip'?DeleteTripById(item.id):DeleteHotelById(item.id)}>מחק<DeleteForeverIcon/></Button>
      </CardActions>
    </Card>
            </li>)}
        </ul>

{notActive.length > 0 &&
<>
{console.log(notActive.length > 0)}
        <h3>לא פעיל</h3>
        <ul className="ul-trip" id="active">
            {notActive.map(item => <li key={item.id} className="li-trip">
            <Card sx={{ maxWidth: 355, height:300}}>
      <CardMedia
        sx={{ height: 150 }}
        
        image={item.pic.length>0?item.pic[0]:"./pic/image.jpg"}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
        {item.type=='trip'?item.tripName:item.hotelName}
        </Typography>
       
      </CardContent>
      <CardActions className="cardAction">
        <Button onClick={()=>nav('/chooseDate',{state: { id: item.id,}})}>צפייה בהזמנות</Button>
        <Button id="edit" onClick={()=>{dispatch(editTrip(item));item.type=='trip'?nav('/AddEndEditAttraction/${user.id}'):nav('/AddEndEditHotel/${user.id}')}}><EditIcon/></Button>
      <Button id="delete" onClick={() => item.type=='trip'?DeleteTripById(item.id):DeleteHotelById(item.id)}>מחק<DeleteForeverIcon/></Button>
      </CardActions>
    </Card>
            </li>)}
        </ul>
        </>
}
        
    </>
}