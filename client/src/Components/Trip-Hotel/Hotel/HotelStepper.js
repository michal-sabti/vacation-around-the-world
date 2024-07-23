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
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PickDate from "../../Orders/Hotel/PickDate";
import PayPalCheckout from "../../Orders/Hotel/Pay";
import NumRooms from "../../Orders/Hotel/numRooms";
import { addDays } from 'date-fns';
import { AddHotelOrderToDb, AddRoomsOrderToDb } from "../../../Store/Services/hotel";
import dayjs from "dayjs";


const steps = ["מספר חדרים", "תאריך", "תשלום"];

export default function HotelStepper() {

  const user = useSelector(state => state.user.currentUser);
  const location = useLocation();
  let hotel = location.state.hotel;
  let dateRange = location.state.dateRange;
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [price, setPrice] = React.useState(0);
  const [idOrder, setIdOrder] = React.useState();

  // מערך של חדרים
  const arr = location.state.arr;
  // const events = location.state.events;
  // console.log("events in hotel stepper")
  // console.log(events)
  const [copyArrRooms, setCopyArrRooms] = React.useState([]);

  // console.log("arr in stepper")
  // console.log(arr)


  // loading
  const [showDiv, setShowDiv] = useState(false);
  const [showLoading, setshowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiv(true);
      setshowLoading(false);
    }, 20000); // עיכוב של כמה שניות

    return () => clearTimeout(timer); // ניקוי הטיימר אם הקומפוננטה מתנתקת
  }, []);
  // ---------------------------------------

  useEffect(() => {
    if (arr)
      setCopyArrRooms(arr);
  })

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
    const currentDate = new Date();
    console.log("currentDate    " + currentDate.toLocaleDateString());

    // בדיקה לפני המעבר לשלב הבא
    // בדיקה לשלב 0
    if (activeStep == 0) {
      console.log("price ---------------------")
      console.log(price)
      if (price > 0)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      else
        Swal.fire({ title: "לא נבחרו חדרים" });
    }
    else
      if (activeStep == 1) {
        // if (events){
        // console.log("events 111111111111111111111111111111111111111111")
        // console.log(events)
        // }

        if (dateRange != null) {
          //----------- לסדר ----------------
          let currentDate = new Date(dateRange.start);
          while (currentDate <= dateRange.end) {
            if (currentDate.background == 'red') {
              Swal.fire({ title: "תאריך שגוי" });
            }
            currentDate = addDays(currentDate, 1);
          }
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


        console.log("dateRange")
        console.log(dateRange.start)
        // הוספת הזמנת המלון לדאטה בייס
        AddHotelOrderToDb({
          hotelId: hotel.id, userId: user.id, currentDate: dayjs().format('YYYY-MM-DD'),
          startDate: dateRange.start, endDate: dateRange.end, price: price
        }).then(result => {
          setIdOrder(result.data[0].id);
          console.log(result.data[0].id);

          // עובר על המערך של החדרים - ושולח כל חדר בנפרד
          if (copyArrRooms) {
            console.log("in add arr rooms to db ")
            console.log(copyArrRooms)
            for (const element of copyArrRooms) {
              AddRoomsOrderToDb(element, result.data[0].id);
            }
          }
        }).catch(error => { console.error(error); });
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
          {hotel.hotelName}
        </Typography>
        <Typography>{hotel.description}</Typography>
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
              {showLoading && <img src="/white.jpg" alt="Loading" />}
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
              {/* {console.log(activeStep)} */}
              {activeStep == 0 ? (
                <NumRooms myHotel={hotel} price={price} setPrice={setPrice} />
              ) : activeStep == 1 ? (
                <PickDate myHotel={hotel} arr={arr} />
              ) : (
                <PayPalCheckout price={price} />
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
                    <Typography variant="caption" sx={{ display: "inline-block" }}>
                      <Button sx={{ mr: 1 }}> שלב {activeStep + 1} כבר הושלם </Button>
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1 ? "סיים" : "השלם שלב"}
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
