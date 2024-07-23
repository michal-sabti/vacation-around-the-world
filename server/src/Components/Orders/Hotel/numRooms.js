
import * as React from 'react';
import { useEffect } from 'react';
import { GetTypeRoomsById } from '../../../Store/Services/hotel';
import SingleNumRoom from './SingleNumRoom';
import { useNavigate } from 'react-router-dom/dist';

export default function NumRooms({ myHotel, price, setPrice }) {
    const hotel = myHotel;
    const [rooms, setArrRooms] = React.useState([]);
    const [chosenRooms, setChosenRooms] = React.useState([]);
    //   מערך של כל החדרים עם הפרטים
    let arr = [...chosenRooms];
    const navigate = useNavigate();

    const prevArr = React.useRef();

    useEffect(() => {
        GetTypeRoomsById(hotel.id)
            .then(x => {
                console.log(x.data);
                setArrRooms(x.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (arr && JSON.stringify(arr) != JSON.stringify(prevArr)) {
            navigate("/stepperHotel", { state: { arr, hotel } });
        }
    }, [arr]);


    const changeNumRooms = (num, type, room, priceAdded) => {
        // מכניס למערך את כל הפרטים של החדרים
        const tempRoom = arr.find(x => x.roomId == room.id);
        if (priceAdded)
            setPrice((prevValue) => prevValue + priceAdded);
        console.log(priceAdded, price)
        // console.log(tempRoom)
        // console.log(type)
        if (tempRoom) {
            if (num <= 0) {
                delete tempRoom[type];
            } else {
                tempRoom[type] = num;
            }
        } else {
            let obj = { roomId: room.id, AmountRooms: num, Adult: 1 }
            setPrice((prev) => prev + room.priceAdult)
            obj[type] = num;
            arr = [...arr, obj]
        }
        setChosenRooms(arr);
    }

    return <>
        <div id="invitation-card">
            <h3> מחיר סופי - {price}₪ </h3><br />
            <div>
                <ul>{rooms.map((room, index) => (<>
                    <SingleNumRoom room={room} key={index} change={changeNumRooms} />
                </>
                ))}</ul>
            </div>
        </div>
    </>
}