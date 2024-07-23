    import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './showAllInvite.scss';
import { useSelector } from 'react-redux';
import { date } from 'yup';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const ShowAllInvite=()=>{
  let arr=useSelector((state) => state.trip.inviteArr);
  let nA=0, nC=0;
  let [orderDate,setOrederDate]=React.useState(0)
  let d=new Date(arr[0]?.orderToDate);

  const [countTiketA,setCountTiketA]=React.useState(0);
  const [countTiketC,setCountTiketC]=React.useState(0);
 
  React.useEffect(()=>{
    for(let i in arr){
     nA+=arr[i].numTiketAdult;
     nC+=arr[i].numTiketChild;
    console.log(nA)
  }
  console.log(nA)
  setCountTiketA(nA)
  setCountTiketC(nC)
  })
  
  return (
    <Box className="box-invite" sx={{ minWidth: 275 }}>
       <h3>הזמנות שבוצעו לתאריך: {d.toLocaleDateString()}</h3>
       <br/>
       <div className='tiketInvite'>
          <h5>סה"כ כרטיסים שהוזמנו: </h5>
          <h5>מבוגר: {countTiketA}</h5>
          <h5>ילד: {countTiketC}</h5>
      </div>
       <div className='div-invite-cards'>
       {arr.map((item)=><>
      <Card className='card-invite' variant="outlined">
   <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        
       הוזמן בתאריך:{item.orderDate}
      </Typography>
      <Typography variant="h5" component="div">
      מחיר כולל ₪{item.totalPrice} 
      </Typography>
      <Typography sx={{ mb: 0.5 }} color="text.secondary">
       מספר כרטיסים
      </Typography>
      <Typography variant="body2">
        מבוגר: {item.numTiketAdult} {bull} ילד: {item.numTiketChild}
       
      </Typography>
    </CardContent>
  </React.Fragment></Card>
  </>
      )}
      </div>
    </Box>
  );


  

}