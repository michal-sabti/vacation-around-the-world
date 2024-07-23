import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";
import "../Scss/stepper.scss";
import { useLocation, useParams } from "react-router-dom";
import NumPeople from "../../Orders/Trip/numPeople";
import PickDate from "../../Orders/Trip/pickDate";
import Pay from "../../Orders/Trip/pay";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AddTripOrderToDb } from "../../../Store/Services/trip";
import dayjs from 'dayjs';

const steps = ["מספר כרטיסים", "תאריך", "תשלום"];

export default function TripStepper() {

  const user = useSelector(state => state.user.currentUser);
  const location = useLocation();
  let trip = location.state.trip;
  const [numAdult, setNumAdult] = React.useState(0);
  const [numChild, setNumChild] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const amount = numAdult + numChild;
  const { date } = useParams();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  // loading
  const [showDiv, setShowDiv] = useState(false);
  const [showLoading, setshowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiv(true);
      setshowLoading(false);
    }, 15000); // עיכוב של כמה שניות

    return () => clearTimeout(timer); // ניקוי הטיימר אם הקומפוננטה מתנתקת
  }, []);
  // ---------------------------------------


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    console.log("amount   " + amount);
    const currentDate = new Date();
    console.log("currentDate    " + currentDate.toLocaleDateString());

    // בדיקה לפני המעבר לשלב הבא
    // בדיקה לשלב 0
    if (activeStep == 0) {
      if (amount > 0)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      else
        Swal.fire({ title: "לא נבחר כמות כרטיסים" });
    }
    else
      // בדיקה לשלב 1
      if (activeStep == 1) {
        if (date != null) {
          if (date >= currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDay())
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else
          Swal.fire({ title: "לא נבחר תאריך" });
      }

      else {
        const newActiveStep =
          isLastStep() && !allStepsCompleted() ?
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);

        // הוספת האטרקציה לדאטה בייס
        AddTripOrderToDb({
          tripId: trip.id, userId: user.id, orderDate: dayjs().format('YYYY-MM-DD'), orderToDate: date
          , numTiketChild: numChild, numTiketAdult: numAdult, totalPrice: price
        })
      }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  return (<>
    <Card className="stepper">
      <CardContent id="stepper-title">
        <Typography gutterBottom variant="h4">
          {trip.tripName}
        </Typography>
        <Typography>{trip.description}</Typography>
      </CardContent>

      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <>
              {/* {showLoading && <img src="/loading.jpg" alt="Loading" id="loading" />} */}
              {showLoading && <img src="/white.jpg" alt="Loading"/>}
              {showDiv &&
                <React.Fragment>
                  <Typography id="div-loading">
                    <b>הזמנתך הושלמה !</b><br /><br />
                    <h4>פירוט הזמנה נשלך אלייך למייל - {user.email}</h4><br />
                    <b>חופשה נעימה  :)</b>
                  </Typography>
                </React.Fragment>
              }
            </>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                שלב {activeStep + 1}
              </Typography>
              {console.log(activeStep)}
              {activeStep == 0 ? (
                <NumPeople myTrip={trip} numAdult={numAdult} numChild={numChild} setNumAdult={setNumAdult}
                  setNumChild={setNumChild} price={price} setPrice={setPrice} />
              ) : activeStep == 1 ? (
                <PickDate myTrip={trip} amount={amount} />
              ) : (
                <Pay myTrip={trip} price={price} />
              )}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  חזרה
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  הבא
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      <Button sx={{ mr: 1 }}>
                        שלב {activeStep + 1} כבר הושלם
                      </Button>
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "סיים"
                        : "השלם שלב"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </Card>
  </>
  );
}
