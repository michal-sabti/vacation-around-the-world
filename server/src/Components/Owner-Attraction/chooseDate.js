import * as React from 'react';
import "./showAllInvite.scss"
import { GetInviteByTripId, GetTripByIdOwner } from '../../Store/Services/ownerHotelAndAttraction';
import { useDispatch, useSelector } from 'react-redux';

import { saveInviteArr, saveTrips } from '../../Store/Action/tripAction';

import 'react-calendar/dist/Calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import { useLocation } from "react-router-dom";
import { ShowAllInvite } from './showAllInvite';
import Swal from 'sweetalert2';

export const ChooseDate=({identify})=>{
  const location = useLocation()
    let id=location.state.id;
  // let id=identify;
    console.log(id)
    let dispatch=useDispatch();
    
    let [arrInvite,setArrInvite]=React.useState([])
    const [arr,setArr]=React.useState([]);
    const user=useSelector(state=>state.user.currentUser);
    let tripArr=useSelector(state=>state.trip.tripArr);
   
    let date=null;
    const nav = useNavigate();
    //  התאריך של היום
    let today = dayjs().format('YYYY-MM-DD');
    const [lastClickedDate, setLastClickedDate] = React.useState(null);

    React.useEffect(()=>{
      console.log(id)
     GetInviteByTripId(id).then(res=>{
            console.log(res.data)
            setArr(res.data);
        }).catch(err=>err.message)
    },[])

    const handleChange=()=>{
      console.log(arr)
       let a=arr.filter((item)=>{
        console.log(item)
        let d=item.orderToDate.substr(0,10)
        console.log(d,date)
          return date===d
        });
       setArrInvite([...a])
       console.log(a)
       if(a.length>0){
           dispatch(saveInviteArr(a));
           nav ('/showAllInvite');
        }
        else
        Swal.fire("לא התבצעו הזמנות לתאריך "+date)
      }


   const handleDateClick = (info) => {
     console.log(info)
       
     date=info.dateStr ;
     console.log(date);

       if (lastClickedDate) {
           lastClickedDate.style.backgroundColor = '';
       }
       // שנה את הצבע של התאריך שנלחץ
       info.dayEl.style.backgroundColor = 'pink';
       // שמור את התאריך שנלחץ כתאריך שנלחץ לאחרונה
       setLastClickedDate(info.dayEl);
       handleChange();
   }


  return (<>

        <div id="div-date">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale='li'
                headerToolbar={{
                    left: "prev,next",
                    center: "title"
                }}
                dateClick={handleDateClick}
            />
        </div>
    


    {/* <div className={arrInvite.length==0?'invitions':'haveInvition invitions'}>
    
      {arrInvite?.map(item=><div key={item.id}>
      <InviteCard item={item}/>
      </div>
    )}
    </div> */}
      
</>

  );

}