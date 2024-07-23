import axios from "axios";
// מלונות של אותה עיר
export const GetAllHotelsByCityId = (id) => {
    return axios.get(`http://localhost:8080/hotel/getAllHotelsByCity/${id}`)
}
export const GetAllHotels = () => {
    return axios.get("http://localhost:8080/hotel/getAllHotels");
}
export const GetSavedHotels = (id) => {
    return axios.get(`http://localhost:8080/hotel/GetSavedHotels/${id}`)
}
// export const GetTrips = (id) => {
//     return axios.get(`http://localhost:8080/trip/GetTrips/${id}`)
// }

//------------------------- פידבקים ------------------------------------------
export const GetAllHotelFeedback = () => {
    return axios.get(`http://localhost:8080/hotel/getAllHotelFeedback`)
}
export const AddLikeTocomment = (id) => {
    return axios.put(`http://localhost:8080/hotel/addLikeTocomment/${id}`)
}
export const RemoveLikeTocomment = (id) => {
    return axios.put(`http://localhost:8080/hotel/removeLikeTocomment/${id}`)
}
export const AddHotelCommentToDB = (details) => {
    console.log(details)
    return axios.post(`http://localhost:8080/hotel/addHotelComment`, details)
}
// ------------------------------------------------------------------------------


//-------------------------- דיווחים על בתי מלון ------------------------------
export const GetAllHotelReport = () => {
    return axios.get(`http://localhost:8080/hotel/getAllHotelReport`)
}
export const AddHotelReport = (user, report, hotel, comment) => {
    console.log("details")
    const data = {
        detail1: user,
        detail2: report,
        detail3: hotel,
        detail4: comment,
    };
    console.log(data)
    return axios.post(`http://localhost:8080/hotel/AddHotelReport`, data)
}
// מחיקת דיווח
export const DeleteHotelReport = (id) => {
    return axios.delete(`http://localhost:8080/hotel/DeleteHotelReport/${id}`)
}
// מחיקת תגובה - עקב דיווח
export const DeleteHotelComment = (id) => {
    return axios.delete(`http://localhost:8080/hotel/DeleteHotelComment/${id}`)
}
// -----------------------------------------------------------------------------------


//   ---------------------------------- הזמנת מלון --------------------------------
export const GetTypeRoomsById = (id) => {
    return axios.get(`http://localhost:8080/orderHotel/getTypeRoomsByHotelId/${id}`)
}
export const GetDatesForOrdersHotel = (hotelId, rooms) => {
    console.log("rooms -----------------------------------------")
    console.log(rooms)
    //GET שליחת המערך באמצעות בקשת 
    return axios.get(`http://localhost:8080/orderHotel/getDatesForOrder/${hotelId}`, { params: { rooms: rooms } });
}

// הוספת הזמנה לטבלה
export const AddHotelOrderToDb = (details) => {
    console.log("details hotel - add order to db")
    console.log(details)
    return axios.post(`http://localhost:8080/orderHotel/addHotelOrderToDb`, details)
}
export const AddRoomsOrderToDb = (element, id) => {
    console.log("arr rooms -  add order to db")
    console.log(element)
    console.log(id)
    return axios.post(`http://localhost:8080/orderHotel/addRoomsOrderToDb/${id}`, element)
  }
  
// ---------------------------------------------------------------------------------




