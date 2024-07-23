import axios from "axios";
export const AddHotel=(object)=>{
   axios.post("http://localhost:8080/AddHotel/addHotel",object)
}