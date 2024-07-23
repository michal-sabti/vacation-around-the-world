import axios from "axios"

export const GetAbout=()=>{
    return axios.get("http://localhost:8080/trip/getAbout");
}
export const UpdateAbout=(update)=>{
    return axios.put("http://localhost:8080/trip/updateAbout",update);
}