import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddImages from "./addImages";
import ManagerDetails from "./managerDetails";
import { GetCityByCityId } from "../../../Store/Services/city";
import { AddRooms } from "./addRooms";
import { AddHotel } from "../../../Store/Services/addHotel";
import BuildAddressH from "./buildAddress";
import { UpdateHotel } from "../../../Store/Services/addEndEditHotel";
import "./add.scss"
const steps = [
  "פרטי בית מלון ",
  "פרטי חדרים",
  "הוספת תמונות",
  " פרטי בעל הבית מלון",
];

export default function AddAndEditHotel({ type }) {
  const [activeStep, setActiveStep] = useState(0);
  const [object, setObject] = useState(null);
  const { id } = useParams();
  const [hotel, setHotel] = useState(
    useSelector((state) => state.trip.editTrip)
  );
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (hotel)
      GetCityByCityId(hotel.cityId)
        .then((res) => {
          let temp = { ...hotel };
          temp.city = res.data[0].name;
          setHotel(temp);
          console.log(hotel);
        })
        .catch((err) => err.message);
  }, []);

  // useEffect(() => {
  //   if (!user) alert("רק משתמש רשום יכול להוסיף אטרקציה");
  // });

  useEffect(() => {
    if (activeStep == steps.length && type == "new") {
      addHotel();
    }
  }, [activeStep]);

  const addHotel = () => {
    try {
      AddHotel(object)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => err.message);
    } catch (err) {
      console.log(err.response);
    }
  };

  const updatehotel = async (obj) => {
    obj.hotel.id=hotel.id;
    console.log(obj)
    try { 
      UpdateHotel(obj).then(res=>{
          console.log(res.data);
      }).catch(err=>err.message)
      
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onSubmit = (data) => {
    const o = { ...object };

    if (type == "new" || activeStep <= 1)
      switch (activeStep) {
        case 0:
          console.log(activeStep);
          // if (type == "edit" || hotel) {
          //   console.log(data);
          //   data.lng = hotel.lng;
          //   data.lat = hotel.lat;
          //   data.id = hotel.id;

          //   updatehotel(data);
          // }

          o.hotel = { ...data };
          setObject({ ...o });
          break;
        case 1:
          o.hotel.arrRooms = { ...data };
          setObject({ ...o });
          if (type == "edit" || hotel) {
            updatehotel(object);
          }
          break;
        case 2:
          o.hotel.images = { ...data };
          setObject({ ...o });
          break;
        case 3:
          o.manager = data;
          setObject({ ...o });
          break;
        default:
          break;
      }
    setActiveStep(activeStep + 1);
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <BuildAddressH
            type={type}
            hotel={type == "edit" ? hotel : null}
            onSubmit={onSubmit}
          />
        );
      case 1:
        return (
          <AddRooms 
          onSubmit={onSubmit} 
          hotel={type == "edit" ? hotel : null} 
          />
        );
      case 2:
        return (
          <AddImages
            hotel={type == "edit" ? hotel : null}
            type={type}
            onSubmit={onSubmit}
          />
        );
      case 3:
        return (
          <ManagerDetails
            onSubmit={onSubmit}
            type={type}
            handleBack={handleBack}
          />
        );
      default:
        return;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return user ? (
    <React.Fragment>
      <Box
        sx={{
          width: "70%",
          padding: "24px",
          margin: "auto",
          backgroundColor: "white",
          marginTop: "24px",
        }}
      >
        <h3 className="text-center mb-5">
          {id ? "עריכת בית מלון" : "הוספת בית מלון"}
        </h3>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <h5 className="me-2 mt-1">{label}</h5>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, p: "24px" }}>
              <Alert severity="success" style={{ fontSize: "x-large" }}>
                <AlertTitle style={{ fontSize: "large" }}>
                  {" "}
                  בית המלון {id ? "עודכן" : "נוצר"} <strong>בהצלחה.</strong>{" "}
                </AlertTitle>
              </Alert>
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="p-4">{getStepContent()}</div>
          </React.Fragment>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            style={{ backgroundColor: "#94db9f", color: "white" }}
            color="inherit"
            disabled={activeStep === 0 || activeStep === steps.length - 1}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            חזרה
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
        </Box>
      </Box>
    </React.Fragment>
  ) : null;
}
