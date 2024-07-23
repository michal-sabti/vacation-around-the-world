import axios from "axios";

export const EditImagesAttraction=(id,vec)=>{
    console.log(id,vec)
   return axios.post(`http://localhost:8080/addAttraction/addImage/${id}`,vec)
}
export const EditImagesHotel=(id,vec)=>{
    console.log(id,vec)
   return axios.post(`http://localhost:8080/addHotel/addImage/${id}`,vec)
}