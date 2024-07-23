import * as React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import './personal.scss';
import { GetAllOrdersByUserId, GetAllTrip, GetSavedTrips } from '../../Store/Services/trip';
import OneTrip from "../Trip-Hotel/Trip/OneTrip";
import '../Trip-Hotel/Scss/trip.scss';
import OneOrder from './oneOrder';
import { GetAllHotels, GetSavedHotels } from '../../Store/Services/hotel';
import { saveHotels } from '../../Store/Action/hotelAction';
import { saveTrips } from "../../Store/Action/tripAction";
import OneHotel from '../Trip-Hotel/Hotel/OneHotel';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Avatar } from '@mui/material';
import EditIcon from '@rsuite/icons/Edit';
import { Button } from 'rsuite';
import { EditPersonalInf } from '../../Store/Services/user';


export const PersonalPlace = () => {

    const user = useSelector(st => st.user.currentUser);
    let dis = useDispatch();
    let [trip, setTrip] = React.useState();
    let [hotel, setHotel] = React.useState();
    // let [tripOfOrders, setTripOfOrders] = React.useState();
    // let savedTrips = useSelector(st => st.trip.tripArr);
    // let savedHotels = useSelector(st => st.hotel.hotelArr);
    let [savedTrips, setSavedTrips] = React.useState([]);
    let [savedHotels, setSavedHotels] = React.useState([]);
    let [orders, setOrders] = React.useState([]);

    let uniqueTrips = Array.from(new Set(savedTrips.map(trip => trip.id)))
        .map(id => savedTrips.find(trip => trip.id == id));
    let uniqueHotels = Array.from(new Set(savedHotels.map(hotel => hotel.id)))
        .map(id => savedHotels.find(hotel => hotel.id == id));

    let [editDiv, setEditDiv] = React.useState(false);
    const [name, setName] = React.useState(user.name);
    const [phone, setPhone] = React.useState(user.phone);
    const [email, setEmail] = React.useState(user.email);

    const editDetailse = () => {
        setEditDiv(true);
    }
    const saveEdit = () => {
        setEditDiv(false);
        EditPersonalInf(user.id, name, phone, email).then(res => {
            console(res.data);
        }).catch(err => err.message)
    }

    React.useEffect(() => {
        if (user) {
            //אטרקציות שאהב
            GetSavedTrips(user.id).then(res => {
                // dis(saveTrips(res.data))
                setSavedTrips(res.data);
            }).catch(err => err.message);

            //מלונות שאהב
            GetSavedHotels(user.id).then(res => {
                // dis(saveHotels(res.data))
                setSavedHotels(res.data);
            }).catch(err => err.message);
        }
    }, [])
    React.useEffect(() => {
        if (user) {
            GetAllOrdersByUserId(user.id).then(res => {
                console.log(res.data)
                setOrders(res.data);
            }).catch(err => err.message)
        }
    }, [])

    React.useEffect(() => {
        if (user) {
            GetAllTrip().then(res => {
                setTrip(res.data);
            }).catch(err => err.message)

            GetAllHotels().then(res => {
                setHotel(res.data);
            }).catch(err => err.message)
        }
    }, [])

    // const a=()=>{
    //     console.log(orders)
    //     for (let i = 0; i < orders.length; i++) {
    //         setTripOfOrders(trip.filter(item => item.id == orders[i].tripId))
    //     }
    //     console.log(tripOfOrders,"tripof")

    // }


    return (<>
        {/* Swal.fire({
                className: "notConnected",
                title: "כדי לראות את אזורך האישי עליך להתחבר ! \n אם אינך רשום , הירשם !!",
            }) && nav("/login") */}

        {user == null ? <>
            <NoAccountsIcon sx={{ fontSize: 150 }} />
            <div className='notConnected'>
                <h2>כדי לראות את אזורך האישי עליך להתחבר ! <br />
                    אם אינך רשום , הירשם !!</h2>
            </div> </> : <>
            <Avatar id="user-avatar">{name.charAt(0)} </Avatar>

            {!editDiv && <div className='user-detailes'>
                <li> <Button onClick={() => editDetailse()}><EditIcon /> </Button> {name}</li>
                <li>{phone} </li>
                <li>{email} </li>
            </div>}

            {editDiv && <div className='user-detailes'>
                <input type='text' value={name} onChange={e => setName(e.target.value)} /><br />
                <input type='text' value={phone} onChange={e => setPhone(e.target.value)} /><br />
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} /><br />
                <Button onClick={() => saveEdit()}>שמור שינויים  </Button>
            </div>}


            {/* מציג אטרקציות שאהב */}
            <label className="like">  אטרקציות <span>«</span></label>
            {!saveTrips ? <h2>אין אטרקציות שמורות</h2> :
                <ul className="ul-trip"> {uniqueTrips.map(item => <li key={item.id} className="li-trip">
                    <OneTrip myTrip={item} />
                </li>)}</ul>}

            <label className="like">  בתי מלון <span>«</span></label>
            {!saveHotels ? <h2>אין מלונות שמורים</h2> :
                <ul className="ul-trip"> {uniqueHotels.map(item => <li key={item.id} className="li-trip">
                    <OneHotel myHotel={item} />
                </li>)}</ul>}

            <label className="like">  הזמנות <span>«</span></label>
            {/* {console.log(orders.length,tripOfOrders.length)} */}
            <ul className='ul-trip'> {orders && trip ? orders.map(item => <li className="li-trip" key={item.id}>

                <OneOrder item={item} trips={trip} />  {/* !!! */}
            </li>) : null}
            </ul>
        </>
        }
    </>)
}