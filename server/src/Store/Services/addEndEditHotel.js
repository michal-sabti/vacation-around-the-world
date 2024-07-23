import axios from "axios";

export const  UpdateHotel=(object)=>{
    return axios.put("http://localhost:8080/editHotel/updateHotel",object)
};