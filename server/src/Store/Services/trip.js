import axios from "axios";

// יעדים פופולריים
export const GetPopularDestinations = () => {
    return axios.get(`http://localhost:8080/trip/getPopularDestinations`);
}
// אטרקציות של אותה עיר
export const GetAllTripsByCityId = (id) => {
    return axios.get(`http://localhost:8080/trip/getAllTripsByCity/${id}`);
}
export const GetAllTrip = () => {
    return axios.get("http://localhost:8080/trip/getAllTrip");
}
export const GetSavedTrips = (id) => {
    return axios.get(`http://localhost:8080/trip/GetSavedTrips/${id}`)
}
export const GetAllFeedback = () => {
    return axios.get(`http://localhost:8080/trip/getAllFeedback`)
}

export const GetTrips = (id) => {
    return axios.get(`http://localhost:8080/trip/GetTrips/${id}`)
}
export const AddLikeTocomment = (id) => {
    return axios.put(`http://localhost:8080/trip/addLikeTocomment/${id}`)
}
export const RemoveLikeTocomment = (id) => {
    return axios.put(`http://localhost:8080/trip/removeLikeTocomment/${id}`)
}
// export const GetCommenterName = (id) => {
//     return axios.get(`http://localhost:8080/trip/getCommenterName/${id}`)
// }
export const GetAllOrdersByUserId = (id) => {
    return axios.get(`http://localhost:8080/trip/getAllOrdersByUser/${id}`)
}
export const AddTripCommentToDB = (details) => {
    return axios.post(`http://localhost:8080/trip/addComment`, details)
}
// export const GetPhotoTrip = (tripId) => {
//     return axios.get(`http://localhost:8080/trip/getPhotoTrip/${tripId}`)
// }
export const GetDatesForOrders = (tripId, amount) => {
    return axios.get(`http://localhost:8080/orderTrip/getDatesForOrder/${tripId}/${amount}`)
}
export const AddTripOrderToDb = (details) => {
    console.log("details add orderrrrrrrrrrrrrrrrrrrrrrr")
    console.log(details)
    return axios.post(`http://localhost:8080/orderTrip/addTripOrderToDb`, details)
}
export const getTop5ByCityId = (id) => {
    return axios.get(`http://localhost:8080/trip/getTop5ByCityId/${id}`)
}