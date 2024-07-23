import axios from "axios";
import { useState } from "react";
export const fetchCountry = async (city) => {
    let setCountry;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCzHlOBmXfDfyXW8xEhBIX__51bNfF4avM`
      );
      console.log(response);
      const countryData = response.data.results[0].address_components.find(
        (component) => component.types.includes('country')
      );
      console.log(countryData);
      console.log(countryData.long_name)
      if (countryData) {
        setCountry=countryData.long_name;
      } else {
        setCountry='Country not found';
      }
      return setCountry;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };