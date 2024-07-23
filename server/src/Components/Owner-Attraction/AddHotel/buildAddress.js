import * as React from "react";
import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import FormInput from "./formInput";
import { GetAllCategoty } from "../../../Store/Services/filter";
import BorderLinearProgress from "./borderLinearProgress";
import SimpleMap from "./map";
import axios from "axios";
import "./add.scss";
const schema = yup
  .object({
    // hotelName: yup.string().min(2, "יש להכניס לפחות שני תווים").max(45,"ניתן להכניס עד 45 תווים").required("שדה זה חובה"),
    // city: yup.string().required("שדה זה חובה"),
    // location: yup.string().max(100,"ניתן להכניס עד 100 תווים").required("שדה זה חובה"),
    // maxPeopleToDay: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
    // description: yup.string().max(250, "מספר תווים מקסימלי הוא 250"),
    // phone: yup.string().required("שדה זה חובה").matches(/^(0|[0-9]\d*)(\.\d+)?$/, "יש להכניס ספרות בלבד"),
    // cancelOrder: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
  })
  .required();

const arr = [
  { lableName: "שם", name: "hotelName", type: "text", flag: false },
  { lableName: "כתובת", name: "location", type: "text", flag: false },
  { lableName: "עיר", name: "city", type: "text", flag: false },
  {
    lableName: "מס מבקרים מקסימאלי ",
    name: "maxPeopleToDay",
    type: "number",
    flag: false,
  },
  { lableName: "טלפון", name: "phone", type: "text", flag: false },
  {
    lableName: "מספר ימים לביטול הזמנה",
    name: "cancelOrder",
    type: "number",
    flag: false,
  },
];
// const arr2 = [
//   { lableName: "שם חדר", name: "roomName", type: "text", flag: false },
//   { lableName: "מס אנשים", name: "countPeople", type: "number", flag: false },
//   { lableName: "מחיר", name: "price", type: "number", flag: false },
// ];

const BuildAddressH = ({ type, hotel, onSubmit }) => {
  console.log(type == "edit");
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("grey");
  const [lat, setLat] = useState(type == "edit" ? hotel.lat : null);
  const [lng, setLng] = useState(type == "edit" ? hotel.lng : null);
  const [text, setText] = useState(" ממליצים לך בחום להוסיף תיאור נרחב ");
  //room
  let [numRooms, setNumRooms] = React.useState(1);
  let [arrRooms, setArrRooms] = React.useState([]);
  var n = new Array(numRooms).fill("");

  

  useEffect(() => {
    if (type=='edit') {
      handleChange({ target: { value: hotel.description } });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {}, [type]);

  useEffect(() => {
    console.log(type, "gggggggggggggggggggggggggggg");
    if (type == "edit") {
      alert("sssssssssssssssssssss")
      arr.forEach((x) =>{ console.log(x.name,hotel[x.name]);setValue(x.name, hotel[x.name])});
    } else {
      arr.forEach((x) => setValue(x.name, ""));
    }
  }, [hotel]);

  useEffect(() => {
    if (lat && lng) {
      getZipCode();
    }
  }, [lat, lng]);

  const handleChange = ({ target }) => {
    const cnt = target.value.length;
    setCount(cnt);
    switch (true) {
      case cnt >= 1 && cnt < 30:
        setColor("red");
        setText("מרגיש לנו שהתיאור שכתבת קצר מידי");
        break;
      case cnt >= 30 && cnt < 50:
        setColor("orange");
        setText("יופי, התיאור הולך לכיוון הנכון");
        break;
      case cnt >= 50 && cnt < 100:
        setColor("yellow");
        setText("עוד ממש קצת וזה שם");
        break;
      case cnt >= 100 && cnt < 120:
        setColor("light-green");
        setText("אוטוטו");
        break;
      case cnt == 250:
        setColor("green");
        setText("בול!");
        break;
      default:
        setColor("grey");
        setText(" ממליצים לך בחום להוסיף תיאור נרחב ");
        break;
    }
  };

  const getZipCode = async () => {
    const latitude = lat;
    const longitude = lng;
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.address && data.address.postcode) {
        const zipCode = data.address.postcode;
        setValue("zipCode", zipCode);
      } else {
        console.error("Zip code not found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCountry = async (city) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCzHlOBmXfDfyXW8xEhBIX__51bNfF4avM`
      );
      console.log(response);
      const countryData = response.data.results[0].address_components.find(
        (component) => component.types.includes("country")
      );
      if (countryData) {
        return countryData.long_name;
      } else {
        return "Country not found";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
// const getMainland = async(country)=>{
//   try {
//     const response = await axios.get(
//       `https://restcountries.com/v3.1/name/italy`
//     );
//     console.log(response,"yyyyyyyyyyyyyyyyyyyy");
//     const countryData = response.data[0].continents[0];
//     if (countryData) {
//       return countryData;
//     } else {
//       return "Country not found";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
  const onSubmit2 = async (data) => {
    console.log(data, "dataaa");
    let desc=data.description;
    let tmp;
    for(let i=0; i<desc.length;i++){
      if(desc[i]=="'")
      {
        tmp=desc.slice(0,i);
        i++;
        console.log(tmp)
        tmp=tmp.concat("\\\'",desc.slice(i))
        console.log(tmp)
        desc=tmp;
        i++;
      }
    }
    data.description=desc;
    let countr = await fetchCountry(data.city);
    data.country = countr;
    data.lng = parseFloat(lng);
    data.lat = parseFloat(lat);
    data.rooms = arrRooms;
    console.log(data);
    delete data.hotel;
    onSubmit(data);
  };
  // const AddRoomToArr = (e, num) => {
  //   const { name, value } = e.target;
  //   console.log(num, name, value);
  //   const tempIndex = arrRooms.findIndex((x) => x.numRoom == num);
  //   if (tempIndex != -1) {
  //     let a = [...arrRooms];
  //     let obj = { ...a[tempIndex] };
  //     obj[name] = value;
  //     a[tempIndex] = obj;
  //     setArrRooms(a);
  //     console.log(a);
  //   } else {
  //     let obj = { numRoom: num };
  //     obj[name] = value;
  //     let a = [...arrRooms, obj];
  //     setArrRooms(a);
  //     console.log(a);
  //   }
  // };

  // const AddRoom = () => {
  //   console.log(numRooms);
  //   setNumRooms(numRooms + 1);
  // };
  return (
    <form onSubmit={handleSubmit(onSubmit2)}>
      <div className="detailsattraction m-4 row gx-0">
        {arr.map((item) => (
          <div key={item.hotelName} className="container-details2 col-md-6">
            <label className="col-md-5 d-flex align-item-center">
              {item.lableName}
            </label>
            <FormInput
              name={item.name}
              type={item.type}
              errors={errors}
              register={register}
              flag={item.flag}
            />
          </div>
        ))}
      </div>

      <div>
        <h4>פרטים נוספים (עד 250 תווים) {count}/250</h4>
        <span>{text}</span>
        <BorderLinearProgress
          color1={color}
          variant="determinate"
          value={count / 1.5}
        />
        <TextField
          id="outlined-multiline-static"
          variant="outlined"
          multiline
          minRows={7}
          inputProps={{ maxLength: 1000 }}
          {...register("description")}
          style={{ width: "32rem" }}
          label="תיאור"
          onChange={handleChange}
          defaultValue={
            type == "edit"
              ? hotel.description
              : "זה המקום להוסיף תיאור כללי על המלון"
          }
        />
      </div>
      {/* room */}
      {/* <Box
        className="box-addRoom"
        sx={{ height: 200, transform: "translateZ(0px)", flexGrow: 1 }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<AddIcon />}
          onClick={() => AddRoom()}
        />

        {<AddOneRoom num={numRooms} addRoom={AddRoomToArr} />}
      </Box> */}
      {/* <div>
    {console.log(n)}
{n?.map((i)=>(
    <div>
    {arr2?.map((item)=>(
    <div>{item.lableName}
    <FormInput
    name={item.name}
    type={item.type}
    errors={errors}
    register={register}
    flag={item.flag}
  />
  </div>
))}
</div> 
) ) }</div> */}

      <div className="mt-5">
        <div
          className="text-start"
          style={{ position: "relative", top: "80px" }}
        >
          <div style={{ width: "300", height: "400" }}>
            <SimpleMap
              type={1}
              setLat={setLat}
              setLng={setLng}
              lat={lat}
              lng={lng}
            />
          </div>
          <Button
          className="next-step"
            variant="contained"
            size="medium"
            style={{ background: "#94db9f"}}
            type="submit"
          >
            להמשיך לשלב הבא
          </Button>
        </div>
      </div>
    </form>
  );
};
export default BuildAddressH;
