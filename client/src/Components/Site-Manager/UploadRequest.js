import * as React from 'react';
import './uploadRequest.scss';
import { GetAllHotelsRequest, GetAllTripsRequest, UpdateActiveHotel, UpdateActiveTrip } from '../../Store/Services/siteManager';
import { Button } from 'rsuite';
import Swal from 'sweetalert2';

export default function UploadRequest() {

    const [tripRequest, setTripRequest] = React.useState([]);
    const [hotelRequest, setHotelRequest] = React.useState([]);

    React.useEffect(() => {
        GetAllTripsRequest().then(res => {
            setTripRequest(res.data);
            console.log(res.data,"trip")
        }).catch(err => err.message);
    }, []);
    
    React.useEffect(() => {
        GetAllHotelsRequest().then(res => {
            setHotelRequest(res.data);
            console.log(res.data)
        }).catch(err => err.message);

        GetAllHotelsRequest().then(res => {
            setHotelRequest(res.data);
            console.log(res.data)
        }).catch(err => err.message);
    }, []);

    const ApproveTrip = (id) => {
        UpdateActiveTrip(id);
        Swal.fire("אטרקציה נוספה בהצלחה !");
        setTripRequest(prevTrips => prevTrips.filter(trip => trip.id !== id));
    }

    const ApproveHotel = (id) => {
        UpdateActiveHotel(id);
        Swal.fire("מלון נוסף בהצלחה !");
        setTripRequest(prevHotel => prevHotel.filter(hotel => hotel.id !== id));
    }

    return (<>
        <ul id="all-requests">
            <li>
                <h1>בקשת העלאת אטרקציה </h1>
                <ul>
                    {tripRequest.length != 0 ?
                        tripRequest.map(item => (
                            <li key={item.id} className='li2-request'>
                                <p>שם אטרקציה : {item.tripName}</p>
                                <p>מספר אטרקציה : {item.id}</p>
                                <p>מנהל אטרקציה : {item.idTripOwner}</p>
                                <p>מספר טלפון : {item.phone}</p>
                                <p>מיקום : {item.location}</p>
                                <img src={item.imgUrl} /><br />
                                <Button variant="contained" className="button" onClick={() => ApproveTrip(item.id)}>אשר</Button>
                            </li>
                        )) : <p>אין בקשות להעלאת אטרקציה !</p>
                    }
                </ul>
            </li>
            <li>
                <h1>בקשת העלאת מלונות </h1>
                <ul>
                    {hotelRequest.length != 0 ?
                        hotelRequest.map(item => (
                            <li key={item.id} className='li2-request'>
                                <p>שם מלון : {item.hotelName}</p>
                                <p>מספר מלון : {item.id}</p>
                                <p>מנהל מלון :  {item.idHotelOwner}</p>
                                <p>מספר טלפון : {item.phone}</p>
                                <p>מיקום : {item.location}</p>
                                <img src={item.url} /><br />
                                <Button variant="contained" className="button" onClick={() => ApproveHotel(item.id)}>אשר</Button>
                            </li>
                        )) : <p>אין בקשות להעלאת מלון !</p>
                    }
                </ul>
            </li>
        </ul>
    </>)
}