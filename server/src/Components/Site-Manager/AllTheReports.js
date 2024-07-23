import { useState } from "react";
import { DeleteComment, DeleteReport, GetAllReport } from "../../Store/Services/siteManager";
import React from "react";
import "./allTheReports.scss";
import { Button } from "rsuite";
import { Box, Rating } from "@mui/material";
import Swal from "sweetalert2";
import { DeleteHotelComment, DeleteHotelReport, GetAllHotelReport } from "../../Store/Services/hotel";

export const AllTheReports = () => {
    const [report, setReport] = useState(null);
    const [OneReport, setOneReport] = useState(null);
    const [HotelReport, setHotelReport] = useState(null);
    const [OneHotelReport, setOneHotelReport] = useState(null);

    React.useEffect(() => {
        GetAllReport().then(res => {
            setReport(res.data.result1);
            setOneReport(res.data.result2);
        }).catch(err => err.message);

        GetAllHotelReport().then(res => {
            console.log("res.data.result1")
            console.log(res.data.result1)
            setHotelReport(res.data.result1);
            setOneHotelReport(res.data.result2);
        }).catch(err => err.message);

    }, [{ OneReport, HotelReport }])

    //מקבל מיקום דיווח
    const Delete1Report = (index1) => {
        OneReport && OneReport.map((item, index) => (
            <div key={index}>
                {index == index1 ?
                    DeleteReport(item.id) &&
                    setOneReport(OneReport.filter((item, index) => index !== index1)) &&
                    Swal.fire({ icon: 'success', title: 'דיווח הוסר בהצלחה' })
                    : null}
            </div>
        ))
        // להוסיף לודינג - טוען
    }

    const Delete1Comment = (id, index) => {
        // עובר על כל הדיווחים של תגובה זאת, מוחק אותם 
        // ואז מוחק תגובה

        // אטרקציה
        {
            OneReport && OneReport.map((item, index) => (
                <div key={index}>
                    {item.comment == id ?
                        Delete1Report(index)
                        : null}
                </div>
            ))
        }
        console.log(id)
        DeleteComment(id);

        Swal.fire({ icon: 'success', title: 'תגובה הוסרה בהצלחה !' })
        return;
    }

    //מקבל מיקום דיווח
    const DeleteHotelReport1 = (index1) => {
        OneHotelReport && OneHotelReport.map((item, index) => (
            <div key={index}>
                {index == index1 ?
                    DeleteHotelReport(item.id) &&
                    Swal.fire({ icon: 'success', title: 'דיווח הוסר בהצלחה' })
                    : null}
            </div>
        ))
    }

    const DeleteHotelComment1 = (id, index) => {
        // עובר על כל הדיווחים של תגובה זאת, מוחק אותם 
        // ואז מוחק תגובה

        // מלון
        {
            OneHotelReport && OneHotelReport.map((item, index) => (
                <div key={index}>
                    {item.comment == id ?
                        DeleteHotelReport1(index)
                        : null}
                </div>
            ))
        }
        console.log(id)
        DeleteHotelComment(id);

        Swal.fire({ icon: 'success', title: 'תגובה הוסרה בהצלחה !' })
        return;
    }


    return (<>
        <h1>דיווחי חוות דעת</h1>
        <div className="big-div-one-report">
            <h2>דיווח על אטרקציות</h2>
            {report && report.map((item, index) => (
                <div key={index} className="one-report">
                    <b>שם מדווח : </b>{item.reportingName}<br />
                    <b>מייל מדוווח : </b>{item.reportingEmail}<br /><br />
                    <b>הדיווח : </b>{item.report}<br />
                    <b>שם האטרקציה : </b>{item.tripName}<br />
                    <b>קטגוריה : </b>{item.nameCategory}<br /><br />
                    <hr />
                    <b>התגובה : </b> {item.Cdescription}<br />
                    <Rating name="size-medium" readOnly defaultValue={item.rankT} /> <br />
                    <b>שם מגיב : </b>{item.commentingName}<br />
                    <b>מייל מגיב : </b>{item.commentingEmail}<br />
                    <br />
                    {console.log("item")}
                    {console.log(item)}

                    <Box sx={{ '& button': { m: 1 }, marginRight: 30 }}>
                        <Button variant="outlined" className="button" onClick={() => Delete1Comment(item.comment, index)}>
                            הסר תגובה
                        </Button>
                        <Button variant="contained" className="button" onClick={() => Delete1Report(index)}>
                            בטל דיווח
                        </Button>
                    </Box>
                </div>
            ))}
        </div>
        <div className="big-div-one-report">
            <h2>דיווח על מלונות</h2>
            {HotelReport && HotelReport.map((item, index) => (
                <div key={index} className="one-report">
                    <b>שם מדווח : </b>{item.reportingName}<br />
                    <b>מייל מדווח : </b>{item.reportingEmail}<br />
                    <b>הדיווח : </b>{item.report}<br />
                    <b>שם המלון : </b>{item.hotelName}<br /> <br />

                    <b>התגובה : </b> {item.Cdescription}<br />
                    <Rating name="size-medium" readOnly defaultValue={item.rankH} /> <br />
                    <b>שם מגיב : </b>{item.commentingName}<br />
                    <b>מייל מגיב : </b>{item.commentingEmail}<br />
                    {console.log("item")}
                    {console.log(item)}

                    <Box sx={{ '& button': { m: 1 }, marginRight: 30 }}>
                        <Button variant="outlined" className="button" onClick={() => DeleteHotelComment1(item.comment, index)}>
                            הסר תגובה
                        </Button>
                        <Button variant="contained" className="button" onClick={() => DeleteHotelReport1(index)}>
                            בטל דיווח
                        </Button>
                    </Box>
                </div>
            ))}
        </div>
    </>);
}