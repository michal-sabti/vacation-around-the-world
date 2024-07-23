import * as React from 'react';
import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { GetDatesForOrdersHotel } from '../../../Store/Services/hotel';
import HotelStepper from '../../Trip-Hotel/Hotel/HotelStepper';
import { CircularProgress } from '@mui/material';

export default function PickDate({ myHotel, arr }) {

    const [dateRange, setDateRange] = useState({ start: null, end: null });

    const hotel = myHotel;
    let date = null;
    // console.log(amount)
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    //  התאריך של היום
    let today = dayjs().format('YYYY-MM-DD');
    const prevDateRange = React.useRef(dateRange);
    const prevArr = React.useRef();

    useEffect(() => {
        // בדיקה אם טווח התאריכים מוגדר
        if (dateRange.start && dateRange.end && dateRange !== prevDateRange.current) {
            // ניווט לדף הבא עם טווח התאריכים ומידע המלון
            navigate("/stepperHotel", { state: { dateRange, hotel } });
        }
        // עדכון המצב הקודם
        prevDateRange.current = dateRange;
    }, [dateRange, navigate, hotel]);

    React.useEffect(() => {
        GetDatesForOrdersHotel(hotel.id, arr)
            .then(x => {
                if (x.data) {
                    const vec = x.data;
                    vec && vec.forEach(element => {
                        const dateObj = new Date(element.start);
                        var month = dateObj.getMonth() + 1; //months from 1-12
                        month = month < 10 ? "0" + month : month;
                        var day = dateObj.getDate();
                        day = day < 10 ? "0" + day : day;
                        var year = dateObj.getFullYear();
                        element.start = year + "-" + month + "-" + day;
                    });
                    setEvents(vec);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const [flagDate, setFlagDate] = useState(true);

    const isEventInDateRange = (events, dateRange) => {
        setFlagDate(false);
        console.log("events in isEventInDateRange")
        console.log(events.Array)
        console.log(dateRange)
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.start == dateRange && event.backgroundColor == "red") {
                Swal.fire({ icon: "error", title: "אין חדרים פנויים בתאריך זה" });
                setFlagDate(true);
                break;
            }
        }
    }
    const handleDateClick = (info) => {
        if (dateRange) {
            console.log(dateRange)
        }

        if (info.dateStr >= today) {
            if (dateRange.start == null) {
                isEventInDateRange(events, info.dateStr);
                if (!flagDate) {
                    setDateRange({ start: info.dateStr, end: info.dateStr });
                    info.dayEl.style.backgroundColor = 'pink';
                }
            }
            else {
                isEventInDateRange(events, info.dateStr);
                if (!flagDate) {
                    if (info.dateStr > dateRange.start && info.dateStr < dateRange.end) {
                        setDateRange({ ...dateRange, end: info.dateStr });
                        info.dayEl.style.backgroundColor = 'pink';
                    }
                    else if (info.dateStr > dateRange.end) {
                        setDateRange({ ...dateRange, end: info.dateStr });
                        info.dayEl.style.backgroundColor = 'pink';
                    }
                    else if (info.dateStr < dateRange.start) {
                        setDateRange({ start: info.dateStr, end: dateRange.end });
                        info.dayEl.style.backgroundColor = 'pink';
                    }
                }
            }
        }
        else {
            if (dateRange.start == null)
                Swal.fire({ icon: "error", title: "תאריך שגוי !" });
        }

        if (dateRange.start && dateRange.end) {
            let currentDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            const afterEndDate = new Date(endDate);
            afterEndDate.setDate(afterEndDate.getDate() + 1);

            while (currentDate <= endDate) {
                let cell = document.querySelector(`.fc-day[data-date="${currentDate.toISOString().split('T')[0]}"]`);
                if (cell) {
                    cell.style.backgroundColor = 'pink';
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

    };

    return (<>
        {
            events.length <= 0 ? <CircularProgress />
                : < div id="invitation-card" >
                    {/* {console.log("events in pick date")}
            {console.log(events)} */}
                    < FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        locale='li'
                        events={events}
                        headerToolbar={{
                            left: "prev,next",
                            center: "title"
                        }
                        }
                        dateClick={handleDateClick}
                    />
                </div >}
    </>
    );
}
