import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
// import { API_URL, doApiMethod, doApiMethodToken } from "../../store/services/service";
import axios from "axios";
// import "../../css/addImages.css";
import { useSelector } from "react-redux";
import SingleImage from "./singleImage";
import { EditImagesAttraction } from "../../../Store/Services/addImage";
import "../AddHotel/add.scss";
const AddImages = ({ onSubmit }) => {

  const [arr, setArr] = useState(new Array(10).fill(""));
  const attraction = useSelector((state) => state.trip.editTrip);
  

  useEffect(() => {
    if (attraction) {
      console.log(attraction)
      const arr2 = [...attraction.pic];
      console.log(arr)
      const updatedArr = [...arr2, ...arr.slice(arr2.length)];
      console.log(updatedArr)
      setArr(updatedArr);
    }
  }, [attraction]);

  const uploadImage = (img, ind) => {
    const formData = new FormData(); //מחלקה שמורה שמטפלת בקבצים
    console.log(img);
    formData.append("file", img);
    console.log(formData);
    formData.append("upload_preset", "React-cloudinary");
    axios.post("https://api.cloudinary.com/v1_1/ds4cwitoo/upload", formData) //https-שרת מאובטח
      .then((response) => {
        console.log(response)
        const url = response.data.url;
        const copy = [...arr];
        copy[ind] = url;
        setArr([...copy]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = async (e, ind) => {
    console.log(e, ind);
    const image = e.target.files[0];
    await uploadImage(image, ind);
  };

  const submit = () => {
    let vec = [...arr.filter(x => x != "")];
    console.log(vec, attraction)
    if(attraction){
        console.log(vec)
        // הורדת התמונות הקיימות בdb
        //והוספת רק התמונות החדשות
        const arr2 = [...attraction.pic];
        for(let i=0; i<arr2.length; i++)
           vec=vec.filter(item=>item!=arr2[i])
        console.log(vec)
        EditImagesAttraction(attraction.id,vec).then(res=>{
          console.log(res.data.message)
        }).catch((err)=>{console.log(err.message)})
    }
    onSubmit(vec)
  };

  return (
    <div className="container">
      <div>
        <p>
          ניתן להעלות עד 10 תמונות ע"י לחיצה על כפתור הפלוס. אחרי הבחירה, בחרו
          תמונה ברורה כדי שתופיע בצורה הטובה ביותר.{" "}
        </p>
        <p>
          {" "}
          <b> אין לכם מה לדאוג, בגלריה התמונה תופיע בגודלה המקורי.</b>{" "}
        </p>
      </div>
      <div className="div-border">
        {" "}
        תמונה ראשית
        <div className="div-container">
          <SingleImage item={arr[0]} index={0} handleChange={handleChange} />
        </div>
      </div>{" "}
      <hr className="my-4" />
      <h2> תמונות נוספות </h2>
      <div className="row gx-0 justify-content-between">
        {arr
          ? arr.map((item, index) => {
              if (index != 0)
                return (
                  <div className="div-images col-3 center" key={index}>
                    <SingleImage
                      item={item}
                      index={index}
                      handleChange={handleChange}
                    />
                  </div>
                );
            })
          : null}
      </div>
      <div className="text-start" style={{ position: "relative", top: "80px" }}>
        <Button
          variant="contained"
          size="medium"
          style={{ background: "#94db9f" }}
          onClick={submit}
        >
          להמשיך לשלב הבא
        </Button>
      </div>
    </div>
  );
};
export default AddImages;
