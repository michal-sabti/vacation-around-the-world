import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { TextField } from '@mui/material';
import NumRooms from './numRooms';

const SingleNumRoom = ({ room, change }) => {

    const [showDiv, setShowDiv] = React.useState(false);
    const [numAdult, setNumAdult] = React.useState(1);
    const [numChild, setNumChild] = React.useState(0);
    const [numRooms, setNumRooms] = React.useState(0);
    const [numPeople, setNumPeople] = React.useState(room.amountPeople);
    let price = numChild * room.priceChild + numAdult * room.priceAdult;

    // מבוגר
    const handleIncrementAdult = () => {
        if (numAdult + numChild < numPeople) {
            change(numAdult + 1, "Adult", room, room.priceAdult);
            setNumAdult((prevValue) => prevValue + 1);
        }
    };
    const handleDecrementAdult = () => {
        if (numAdult > 1 && numChild >= 0) {
            change(numAdult - 1, "Adult", room, room.priceAdult * -1);
            setNumAdult((prevValue) => prevValue - 1)
        }
    };

    // ילד
    const handleIncrementChild = () => {
        change(numChild, "Child", room, room.priceChild);
        if (numChild + numAdult < numPeople)
            setNumChild((prevValue) => prevValue + 1);
        if (numChild > -1 && numAdult == 0)
            setNumAdult(numAdult + 1);
    };
    const handleDecrementChild = () => {
        change(numChild - 1, "Child", room, room.priceChild * -1);
        if (numChild > 0)
            setNumChild((prevValue) => prevValue - 1)
    };

    // חדרים
    const handleIncrementRoom = () => {
        change(numRooms + 1, "AmountRooms", room);
        setNumRooms((prevValue) => prevValue + 1);
        // if (numRooms >= 1)
        //     setNumAdult((prevValue) => prevValue + 1);

        if (numRooms >= 1)
            setNumPeople(numPeople * 2)
        setShowDiv(true)
    };
    const handleDecrementRoom = async () => {
        if (numRooms >= 1) {
            change(numRooms - 1, "AmountRooms", room);
            setNumRooms((prevValue) => prevValue - 1);
            //     setNumAdult((prevValue) => prevValue - 1);
        }

        if (numRooms == 1)
            setShowDiv(false)
    };

    return <ul className='big-ul-rooms'>
        <li className="li1-hotel">
            <h4>{room.roomName} <br /> מקסימום אנשים בחדר : {room.amountPeople}</h4>
            מחיר למבוגר -  {room.priceAdult}<br />
            <h6>גיל 18 או יותר</h6>
            מחיר לילד -  {room.priceChild}<br />
            <h6>גיל 17 - 0</h6>
            <br />
        </li>
        <li className="li2-hotel">
            <IconButton onClick={handleDecrementRoom}>
                <RemoveIcon />
            </IconButton>
            <TextField value={numRooms} />
            <IconButton onClick={handleIncrementRoom}>
                <AddIcon />
            </IconButton><br />

            {showDiv && <>{/*(room.id != 1) &&*/}
                <div className='show2-div'>
                    <p>מספר מבוגרים</p>
                    <div className='plus-minus'>
                        <IconButton onClick={handleDecrementAdult}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField value={numAdult} />
                        <IconButton onClick={handleIncrementAdult}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <br /> <br />
                    <p> מספר ילדים </p>
                    <div className='plus-minus'>
                        <IconButton onClick={handleDecrementChild}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField value={numChild} />
                        <IconButton onClick={handleIncrementChild}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
            </>}
            <br />
        </li >
        {
            numRooms ?
                <div className='num-people-inside-room'>
                    < GroupsIcon /> <p>מבוגרים {numAdult}</p>
                    <p> מספר ילדים {numChild} </p>
                    <p> מספר חדרים {numRooms} </p>
                    <p> מחיר {price} </p>
                </div > : null
        }
    </ul>
}
export default SingleNumRoom;