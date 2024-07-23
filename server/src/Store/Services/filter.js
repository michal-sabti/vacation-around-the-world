import axios from "axios";

export const GetAllCategoty = () => {
    return axios.get(`http://localhost:8080/trip/getAllCategory`);
}
export const GetCitiesByCategoty = (arr,id) => {
    return axios.get(`http://localhost:8080/trip/getChosenCategoty/${arr}/${id}`);
}
export const AddLikeTrip = (details) => {
    return axios.post(`http://localhost:8080/trip/LikeTrip`, details);
}
export const AddLikeHotel = (details) => {
    return axios.post(`http://localhost:8080/hotel/LikeHotel`, details);
}
