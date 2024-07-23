import { AddOneRoom } from "./addOneRoom";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
export const AddRooms = ({ onSubmit, hotel }) => {

  let [arrRooms, setArrRooms] = React.useState([]);
  let [numRooms, setNumRooms] = React.useState(1);
  console.log(hotel);
  React.useEffect(() => {
    if (hotel) {
      for (let i in hotel.rooms) {
        console.log(i)
        hotel.rooms[i].numRoom = parseInt(i) + 1
        console.log(hotel.rooms[i])
      }
      setArrRooms(hotel.rooms)
    }
  }, [])
  const AddRoomToArr = (e, num) => {
    const { name, value } = e.target;
    console.log(num, name, value);
    const tempIndex = arrRooms.findIndex((x) => x.numRoom == num);
    if (tempIndex != -1) {
      let a = [...arrRooms];
      let obj = { ...a[tempIndex] };
      console.log(a)
      console.log(obj, "jjjjjjjjjjjjjjj")
      obj[name] = value;
      a[tempIndex] = obj;
      setArrRooms(a);
      console.log(a);
    } else {
      let obj = { numRoom: num };
      obj[name] = value;
      let a = [...arrRooms, obj];
      setArrRooms(a);
      console.log(a);
    }
  };

  const AddRoom = () => {
    console.log(numRooms);
    setNumRooms(numRooms + 1);
  };
  const OnSubmit2 = () => {
    onSubmit(arrRooms)
  }
  return <>
    <Box
      className="box-addRoom"
      sx={{ height: 200, transform: "translateZ(0px)", flexGrow: 1 }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<AddIcon />}
        onClick={() => AddRoom()}
      />

      {<AddOneRoom
        num={numRooms}
        addRoom={AddRoomToArr}
        hotel={hotel}
        roomArr={hotel ? arrRooms : null}
      />}
    </Box>
    <Button
      variant="contained"
      size="medium"
      style={{ background: "#94db9f"}}
      id="button"
      type="submit"
      onClick={OnSubmit2}
    >
      להמשיך לשלב הבא
     </Button>
  </>

}
