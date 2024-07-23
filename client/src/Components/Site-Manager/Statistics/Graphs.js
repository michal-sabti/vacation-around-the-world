import * as React from 'react';
import "../siteManager.scss";
import './graphs.scss';

import CanvasJSReact from '@canvasjs/react-charts';
import { HotelComments5Stars, TripComments5Stars } from '../../../Store/Services/siteManager';
import { useEffect } from 'react';
import { useState } from 'react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Graphs() {

  // {/* /////////////////   סטטיסטיקות   /////////////////// */ }

  const [top5Trip, setTop5Trip] = useState(null);
  const [top5Hotel, setTop5Hotel] = useState(null);

  useEffect(() => {
    TripComments5Stars().then(res => {
      setTop5Trip(res.data);
    }).catch(err => { console.log(err); })

    HotelComments5Stars().then(res => {
      setTop5Hotel(res.data);
      console.log('res.data ------------- hotellll');
      console.log(res.data);
    }).catch(err => { console.log(err); })
  }, [])

  const options = {
    title: { text: "טופ 5 מלונות" },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} \n - {y}%",
      dataPoints: top5Hotel ? top5Hotel.map((hotel, i) => ({
        y: (top5Hotel[i].comments5Stars / top5Hotel[i].rankCount) * 100,
        label: hotel.hotelName
      })) : null
    }]
  };

  const options2 = {
    title: { text: "טופ 5 אטרקציות " },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} \n - {y}%",
      dataPoints: top5Trip ? top5Trip.map((trip, i) => ({
        y: (trip.comments5Stars / trip.rankCount) * 100,
        label: trip.tripName
      })) : null
    }]
  };

  return (<>
    <div id="show-statics">
      <div className='div1'>
        {options2 != null && options2 != undefined ?
          <CanvasJSChart options={options2} /> : null
        }
      </div>
      <hr />
      <div className='div1'>
        {options != null && options != undefined ?
          <CanvasJSChart options={options} /> : null
        }
      </div>
    </div>
  </>)
}