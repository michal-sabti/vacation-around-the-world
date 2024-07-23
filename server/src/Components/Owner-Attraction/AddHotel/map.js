import React, { useRef, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Button } from "@mui/material";
import "./searchButton";
import "../AddHotel/add.scss";
const AnyReactComponent = ({ text }) => (
  <input type="button" style={{ border: "none" }} value={text} />
);

const SimpleMap = ({ type, setLat, setLng, lat, lng }) => {
  const inputRef = useRef();
  const searchProvider = new OpenStreetMapProvider();
  

  const [location, setLocation] = useState({
    center: {
      lat: 31.772561767303255,
      lng: 35.16862111683302,
    },
    zoom: 15,
  });

  useEffect(() => {
    setLocation({
      center: {
        lat: lat ? lat : 31.772561767303255,
        lng: lng ? lng : 35.16862111683302,
      },
      zoom: 15,
    });
  }, [lat, lng]);

    const doSearchAddress = async () => {
      let input_val = inputRef.current.value;
      console.log(inputRef)
      let results = await searchProvider.search({ query: input_val });
      console.log(results);
      setLat(results[0].y);
      setLng(results[0].x);
  }

  const handleChange = (e) => {
    console.log(e)
    const l1 = e.geometry.location.lat;
    const l2 = e.geometry.location.lng;
    setLat(l1);
    setLng(l2);
  };
  const defaultProps = {
    center: {
      lat: location.center.lat ? location.center.lat : 31.772561767303255,
      lng: location.center.lng ? location.center.lng : 35.16862111683302,
    },
    zoom: 15,
  };
  

  
  return (
  
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <SearchButton/> */}
      {console.log(type, "type")}
      {
        (type = 1 && (
      //  <LocationAutocomplete/>
          <Autocomplete
            className="autocomplete-address-input"
            ref={inputRef}
            options={{
              componentRestrictions: { country: "ISR" },
              types: ["geocode"],
            }}
            onPlaceSelected={handleChange}
          />
        
        ))
      }
     
      <br />
      <Button onClick={doSearchAddress} className='mapInp' variant='contained' style={{backgroundColor: "#ebedf0" }}>
                    <SearchIcon />
                </Button>
      {console.log(location.center)}

      <GoogleMapReact
        center={location.center}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={(e) => {
          if (type == 1) {
            setLat(e.lat);
            setLng(e.lng);
            const x = { ...location };
            x.center.lat = e.lat;
            x.center.lng = e.lng;
            setLocation(x);
          }
        }}
       
      > 
        <AnyReactComponent
          lat={location.center.lat ? location.center.lat : 31.772561767303255} 
          lng={location.center.lng ? location.center.lng : 35.16862111683302}
          text="אנחנו כאן"
        />
      </GoogleMapReact>
    </div>
  );
};
export default SimpleMap;

// api key=AIzaSyCzHlOBmXfDfyXW8xEhBIX__51bNfF4avM
