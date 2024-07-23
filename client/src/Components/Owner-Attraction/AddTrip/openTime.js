// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import React from 'react';

// export const OpenTime=({fromHour, setFromHour, toHour, setToHour})=>{
  
//     const checkFrom=(e)=>{
//         setFromHour(e.$H+":"+e.$m)
//         console.log(toHour) 
//       }
//       const checkTo=(e)=>{
//         setToHour(e.$H+":"+e.$m)
//         console.log(toHour)
//       }

//     return(<div className='opening-hour'>
//     <h4>שעות פתיחה</h4>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['TimePicker']}>
//         <h4>משעה</h4>
//         <TimePicker  onChange={(e)=>{checkFrom(e)}}/> 
//         <h4>עד שעה</h4>
//         <TimePicker  onChange={(e)=>{checkTo(e)}}/>
//       </DemoContainer>
//     </LocalizationProvider>

// </div>
//     )
// }