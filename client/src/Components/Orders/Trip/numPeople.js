import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TextField } from "@mui/material";

export default function NumPeople({ myTrip, numAdult, numChild, setNumAdult, setNumChild, price, setPrice }) {

    const trip = myTrip;
    setPrice(trip.price * numAdult + trip.childPrice * numChild);

    // מבוגר
    const handleIncrementAdult = () => {
        if (numAdult < 15)
            setNumAdult((prevValue) => prevValue + 1);
    };
    const handleDecrementAdult = () => {
        if (numAdult > 1 && numChild >= 0)
            setNumAdult((prevValue) => prevValue - 1)
    };
    // ילד
    const handleIncrementChild = () => {
        setNumChild((prevValue) => prevValue + 1);
        if (numChild > -1 && numAdult == 0)
            setNumAdult(numAdult + 1);

    };
    const handleDecrementChild = () => {
        if (numChild > 0)
            setNumChild((prevValue) => prevValue - 1)
    };

    return <>
        <div id="invitation-card">
            <div className="numPeople">
                <h4> מספר מבוגרים ( 18+ )</h4>
                <div>
                    <IconButton onClick={handleDecrementAdult}>
                        <RemoveIcon />
                    </IconButton>
                    <TextField value={numAdult} type="text" />
                    <IconButton onClick={handleIncrementAdult}>
                        <AddIcon />
                    </IconButton>
                </div>
                <h4>מחיר למבוגר - {trip.price}</h4>
            </div>

            <div className="numPeople">
                <h4> מספר ילדים (גיל 3-18)</h4>
                <div>
                    <IconButton onClick={handleDecrementChild}>
                        <RemoveIcon />
                    </IconButton>
                    <TextField value={numChild} type="text" />
                    <IconButton onClick={handleIncrementChild}>
                        <AddIcon />
                    </IconButton>
                </div>
                <h4>מחיר לילד - {trip.childPrice}</h4>
            </div>
            <h3> מחיר סופי - ₪{price} </h3>
        </div>
    </>
}