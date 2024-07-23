import * as React from "react";
import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormInput from "./formInput";
import { GetAllCategoty } from "../../../Store/Services/filter";
import BorderLinearProgress from "./borderLinearProgress";
import SimpleMap from "./map";
import axios from "axios";
import { Height } from "@mui/icons-material";
import { fetchCountry } from "./input";
import { OpenTime } from "./openTime";




const schema = yup
  .object({
    tripName: yup.string().min(2, "יש להכניס לפחות שני תווים").max(45,"ניתן להכניס מקסימום 45 תווים").required("שדה זה חובה"),
    city: yup.string().required("שדה זה חובה"),
    location: yup.string().max(100,"ניתן להכניס עד 100 תווים").required("שדה זה חובה"),
    childPrice: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
    price: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
    maxPeopleToDay: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
    description: yup.string().max(300, "מספר תווים מקסימלי הוא 300"),
    category: yup.string(),
    phone: yup.string().required("שדה זה חובה").matches(/^(0|[0-9]\d*)(\.\d+)?$/, "יש להכניס ספרות בלבד"),
    cancelOrder: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
  
  })
  .required();

const arr = [
  { lableName: "שם", name: "tripName", type: "text", flag: false },
  { lableName: "כתובת", name: "location", type: "text", flag: false },
  { lableName: "עיר", name: "city", type: "text", flag: false },
  { lableName: "מחיר לילד", name: "childPrice", type: "number", flag: false },
  { lableName: "מחיר למבוגר", name: "price", type: "text", flag: false },
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

const BuildAddressT = ({ type, attraction, onSubmit }) => {
  console.log(type == "edit");
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("grey");
  const [allCategory, setAllCategory] = useState([]);
  const [lat, setLat] = useState(type == "edit" ? attraction.lat : null);
  const [lng, setLng] = useState(type == "edit" ? attraction.lng : null);
  const [text, setText] = useState(" ממליצים לך בחום להוסיף תיאור נרחב ");
  const [newCategory,setNewCategory]=React.useState("");
  const [category, setCategory] = useState("1");
  //שעות פתיחה
  const [fromHour,setFromHour]=React.useState(0);
  const [toHour,setToHour]=React.useState(0);
  const handleChangeCategory = (event) => {
    console.log(event);
    console.log(event.target.value);
    setCategory(parseInt(event.target.value));
  };
 
  useEffect(() => {
    GetAllCategoty()
      .then((res) => {
        setAllCategory(res.data.filter(item=>item.approved==true));
      })
      .catch((err) => err.message);
  }, []);

  useEffect(() => {
    if (attraction) {
      handleChange({ target: { value: attraction.description } });
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

  useEffect(()=>{},[type])

  useEffect(() => {
    console.log(type, "gggggggggggggggggggggggggggg");
    if (type == "edit") {
      arr.forEach((x) => setValue(x.name, attraction[x.name]));
    } else {
      arr.forEach((x) => setValue(x.name, ""));
    }
  }, [attraction]);

  useEffect(() => {
    if (lat && lng) {
      getZipCode();
    }
  }, [lat, lng]);

  const SetNewCategory=(e)=>{
      setNewCategory(e.target.value)
  }
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
      case cnt >= 150:
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

  const onSubmit2 = async (data) => {
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
    console.log(data.description)
    data.newCategory=newCategory;
    data.fromHour=fromHour;
    data.toHour=toHour;
    let countr = await fetchCountry(data.city);
    console.log("llllllllllllllllllll", countr);
    data.country = countr;
    if(category=='')
      data.category=attraction.category;
    else
      data.category = parseInt(category);
    console.log(data.category);
    data.lng = parseFloat(lng);
    data.lat = parseFloat(lat);
    console.log(data);
    delete data.attraction;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit2)}>
      <div className="detailsattraction m-4 row gx-0">
        {arr.map((item) => (
          <div key={item.name} className="container-details2 col-md-6">
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
        {/* שעות פתיחה */}
        <div>
     {/* <OpenTime fromHour={fromHour} setFromHour={setFromHour} toHour={setToHour} setToHour={setToHour}/> */}

        </div>
        {/* בחירת קטגוריה */}
        <FormControl sx={{ m: 1, minWidth: 120 }} className="category">
          <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={Number(attraction?.category)}
            label="category"
            {...register("category")}
            onChange={handleChangeCategory}
          >
            {allCategory.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nameCategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="newCategory-div"><br/><br/>
        <p>אינך מוצא קטגוריה מתאימה?
            שלח בקשה להוספת קטגוריה....
        </p>
        <TextField id="standard-basic" label="קטגוריה חדשה" variant="standard" onChange={(e)=>{SetNewCategory(e)}}/>
      </div>
      <div>
        <h4>פרטים נוספים (עד 300 תווים) {count}/300</h4>
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
          inputProps={{ maxLength: 500 }}
          {...register("description")}
          style={{ width: "32rem" }}
          label="תיאור"
          onChange={handleChange}
          
          defaultValue={
            type == 'edit'?
               attraction.description:
              "זה המקום להוסיף תיאור כללי על האטרקציה"
          }
        />
      </div>
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
            style={{ background: "#94db9f" }}
            type="submit"
          >
            להמשיך לשלב הבא
          </Button>
        </div>
      </div>
    </form>
  );
};
export default BuildAddressT;
