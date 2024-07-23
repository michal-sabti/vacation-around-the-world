import axios from "axios";
export const AddTripToCity=(details)=>{
    return axios.post(`http://localhost:8080/cityManager/addTrip`,details)
}
export const UpdateTrip=(trip)=>{
    return axios.post(`http://localhost:8080/cityManager/updateTrip`,trip)
}
export const GetTripByIdOwner=(user)=>{
    console.log(user,"id")
    return axios.get(`http://localhost:8080/cityManager/getTripByIdOwner/${user}`)
}
export const GetHotelByIdOwner=(user)=>{
    console.log(user,"id")
    return axios.get(`http://localhost:8080/cityManager/getHotelByIdOwner/${user}`)
}
export const GetCityByCityManager=(id)=>{
    console.log(id,"id")
    return axios.get(`http://localhost:8080/cityManager/getCityByCityManager/${id}`)
}
export const DeleteTrip=(idTrip)=>{
    return axios.put(`http://localhost:8080/cityManager/deleteTrip/${idTrip}`)
}
export const DeleteHotel=(idTrip)=>{
    return axios.put(`http://localhost:8080/cityManager/deleteHotel/${idTrip}`)
}
export const GetInviteByTripId=(id)=>{
    console.log(id)
    return axios.get(`http://localhost:8080/cityManager/getInviteByTripId/${id}`)
}
export const AddCategory=(category)=>{
    console.log(category)
    return axios.post(`http://localhost:8080/cityManager/addCategory/${category}`)
}
