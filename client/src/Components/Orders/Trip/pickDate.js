import * as React from 'react';
import 'react-calendar/dist/Calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GetDatesForOrders } from '../../../Store/Services/trip';
import { useEffect } from 'react';

export default function PickDate({ myTrip, amount }) {
    const trip = myTrip;
    let date = null;
    console.log(amount)
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    //  התאריך של היום
    let today = dayjs().format('YYYY-MM-DD');
    const [lastClickedDate, setLastClickedDate] = useState(null);
    // console.log(trip.id)

    useEffect(() => {
        GetDatesForOrders(trip.id, amount)
            .then(x => {
                console.log(x.data);
                const vec = x.data;
                vec.forEach(element => {
                    const dateObj = new Date(element.start);
                    var month = dateObj.getMonth() + 1; //months from 1-12
                    month = month < 10 ? "0" + month : month;
                    var day = dateObj.getDate();
                    day = day < 10 ? "0" + day : day;
                    var year = dateObj.getFullYear();
                    element.start = year + "-" + month + "-" + day;
                });
                setEvents(vec);
            })
            .catch(err => console.log(err))
    }, [])
    const handleDateClick = (info) => {
        if (info.dateStr < today) {
            Swal.fire({ title: "תאריך שגוי" })
            date = null;
        }
        else {
            date = info.dateStr;
            // console.log(date);
            navigate("/stepperTrip/" + date + "", { state: { trip } });
        }

        if (lastClickedDate) {
            lastClickedDate.style.backgroundColor = '';
        }
        // שנה את הצבע של התאריך שנלחץ
        info.dayEl.style.backgroundColor = 'pink';
        // שמור את התאריך שנלחץ כתאריך שנלחץ לאחרונה
        setLastClickedDate(info.dayEl);
    }
    console.log(today);

    return (
        <div id="invitation-card">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale='li'
                events={events}
                headerToolbar={{
                    left: "prev,next",
                    center: "title"
                }}
                dateClick={handleDateClick}
            />
        </div>
    );
}
