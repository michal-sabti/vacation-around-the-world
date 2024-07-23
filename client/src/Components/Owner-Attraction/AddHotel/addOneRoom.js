import TextField from '@mui/material/TextField';
import * as React from 'react';
import "./add.scss";

export const AddOneRoom=({num,addRoom,hotel,roomArr})=>{
    console.log(num);
    let n=new Array(num).fill('0')
    // let [n,setn] =React.useState(new Array(num).fill('0')) ;
    console.log(n)
  React.useEffect(()=>{
    if(hotel)
    {
        console.log("kkk",hotel.rooms)
        // setn(hotel.rooms);
    }
  },[n])
    console.log(n)
    let roomName=React.useRef(null);
    let countPeople=React.useRef(null);
    let adultPrice=React.useRef(null);
    let childPrice=React.useRef(null);
    let numKindRooms=React.useRef(null);
    

return(
n.map((item, index) =>  <div className='div-one-room' style={{}}>
    <h4>חדר {index+1}</h4>
   {/* { console.log(hotel.rooms?[index].roomName)} */}
    <TextField className='f' id="standard-basic" label="שם חדר" variant="standard" name='roomName' defaultValue={hotel?.rooms[index].roomName}  inputRef={roomName}  onChange={(e)=>addRoom(e, index+1)}/>
    <TextField id="standard-basic" label="כמות אנשים" variant="standard" name='countPeople' defaultValue={hotel?.rooms[index].amountPeople} inputRef={countPeople} onChange={(e)=>addRoom(e, index+1)}/>
    <TextField id="standard-basic" label="מחיר למבוגר" variant="standard" name='adultPrice' defaultValue={hotel?.rooms[index].adultPrice} inputRef={adultPrice} onChange={(e)=>addRoom(e, index+1)}/>
    <TextField id="standard-basic" label="מחיר לילד" variant="standard" name='childPrice' defaultValue={hotel?.rooms[index].childPrice} inputRef={childPrice} onChange={(e)=>addRoom(e, index+1)}/>
    <TextField id="standard-basic" label="מספר חדרים" variant="standard" name='numKindRooms' defaultValue={hotel?.rooms[index].numKindRooms} inputRef={numKindRooms} onChange={(e)=>addRoom(e, index+1)}/>
    
    
</div>
)
)



    
}