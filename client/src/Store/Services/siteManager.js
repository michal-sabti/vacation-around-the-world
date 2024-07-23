import axios from "axios"
export const GetUnapprovedCategories = () => {
    return axios.get("http://localhost:8080/siteManager/getUnapprovedCategories")
}
export const UpdateCategoryToApproved = (arr) => {
    console.log(arr)
    return axios.put("http://localhost:8080/siteManager/updateCategoryToApproved",arr)
}

//reports
export const GetAllReport = () => {   // trip
    return axios.get(`http://localhost:8080/siteManager/getAllReport`)
}
export const AddReport = (user, report, trip, comment) => {
    console.log("details")
    const data = {
        detail1: user,
        detail2: report,
        detail3: trip,
        detail4: comment,
    };
    console.log(data)
    return axios.post(`http://localhost:8080/siteManager/AddReport`, data)
}
export const DeleteReport = (id) => {
    return axios.delete(`http://localhost:8080/siteManager/DeleteReport/${id}`)
}
// מחיקת תגובה - עקב דיווח
export const DeleteComment = (id) => {
    console.log("id")
    console.log(id)
    return axios.delete(`http://localhost:8080/siteManager/DeleteComment/${id}`)
}

//סטטיסטיקות
//top 5 trips
export const TripComments5Stars = () => {
    return axios.get(`http://localhost:8080/siteManager/5StarCommentsTrip`)
}
//top 5 hotel
export const HotelComments5Stars = () => {
    return axios.get(`http://localhost:8080/siteManager/5StarCommentsHotel`)
}

// מציג את כל בקשות העלאת אטרקציה
export const GetAllTripsRequest = () => {
    return axios.get(`http://localhost:8080/siteManager/getAllTripsRequest`)
}
// מציג את כל בקשות העלאת מלון
export const GetAllHotelsRequest = () => {
    return axios.get(`http://localhost:8080/siteManager/getAllHotelsRequest`)
}
// אישור העלאת אטרקציה
export const UpdateActiveTrip = (id) => {
    return axios.put(`http://localhost:8080/siteManager/updateActiveTrip/${id}`)
}
// אישור העלאת מלון
export const UpdateActiveHotel = (id) => {
    return axios.put(`http://localhost:8080/siteManager/updateActiveHotel/${id}`)
}