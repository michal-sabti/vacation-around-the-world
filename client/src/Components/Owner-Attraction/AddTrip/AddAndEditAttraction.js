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
import BuildAddressT from "./buildAddress";
import AddImages from "./addImages";
import ManagerDetails from "../AddTrip/managerDetails";
import { AddAttraction, UpdateTrip } from "../../../Store/Services/addEndEditAttraction";
import { GetCityByCityId } from "../../../Store/Services/city";
import { GetAllCategoty } from "../../../Store/Services/filter";
import "../AddHotel/add.scss";
const steps = ["פרטי אטרקציה ", "הוספת תמונות", " פרטי בעל אטרקציה"];

export default function AddAndEditAttraction({ type }) {
  const [activeStep, setActiveStep] = useState(0);
  const [object, setObject] = useState(null);
  // const [attraction, setAttraction] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [attraction, setAttraction] = useState(useSelector((state) => state.trip.editTrip));
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (attraction)
      GetCityByCityId(attraction.cityId)
        .then((res) => {
          let temp = { ...attraction };
          temp.city = res.data[0].name;
          setAttraction(temp);
          console.log(attraction);
        })
        .catch((err) => err.message);
  }, []);


  useEffect(() => {
    if (activeStep == steps.length && type == "new") {
      addAttraction();
    }
  }, [activeStep]);

  const addAttraction = () => {
    try {
      AddAttraction(object)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => err.message);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const UpdateAttraction = async (obj) => {
    alert("update")
    try {
      UpdateTrip(obj).then(res=>{
          console.log(res.data);
      }).catch(err=>err.message)
      obj.images = attraction.images;
      // dispatch(currentattraction({ attraction: obj }))
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onSubmit = (data) => {
    const o = { ...object };

    if (type == "new" || activeStep == 0)
      switch (activeStep) {
        case 0:
          console.log(activeStep);
          if (type == "edit" || attraction) {
            console.log(data);
            data.lng = attraction.lng;
            data.lat = attraction.lat;
            data.id = attraction.id;

            UpdateAttraction(data);
          }

          o.attraction = { ...data };
          setObject({ ...o });
          break;
        case 1:
          o.attraction.images = { ...data };
          setObject({ ...o });
          break;
        case 2:
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
          <BuildAddressT
            type={type}
            attraction={type == "edit" ? attraction : null}
            onSubmit={onSubmit}
          />
        );
      case 1:
        return <AddImages onSubmit={onSubmit} />;
      case 2:
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

  return <React.Fragment>
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
          {id ? "עריכת אטרקציה" : "הוספת אטרקציה"}
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
                  האטרקציה {id ? "עודכנה" : "נוצרה"} <strong>בהצלחה.</strong>{" "}
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
;
}
