import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OneOrder({ item, trips }) {
  let [trip, setTrip] = React.useState();
  let order = item;
  console.log(order)
  console.log({ item }, { trips })
  let dateInvite = new Date(item.orderToDate);



  React.useEffect(() => {
    console.log({ trips })
    setTrip(trips.filter(x => x.id == item.tripId))
  }, [])


  return (
    trip ? <Card sx={{ maxWidth: 345 }}>{console.log(trip)}
      <CardMedia
        sx={{ height: 140 }}
        image={trip[0].pic}
        title={"green iguana"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {trip[0].tripName}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          תאריך הזמנה: {dateInvite.toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          מספר כרטיסים: {item.numTiketChild}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          מספר כרטיסים: {item.numTiketAdult}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          סך הכל: {item.totalPrice}₪
        </Typography>
      </CardContent>
      <CardActions>
        {new Date(dateInvite.getTime() + trip[0].cancelOrder * 24 * 60 * 60 * 1000) >= new Date() ?
          <Button>בטל הזמנה</Button> : null
        }
      </CardActions>
    </Card> : null
  );
}