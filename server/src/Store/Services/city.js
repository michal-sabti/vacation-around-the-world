import axios from "axios";
export const GetAllCitiesByCountryId = (id) => {
    return axios.get(`http://localhost:8080/trip/getAllCitiesByCountryId/${id}`);
}
export const GetCityByCityId = (id) => {
    console.log(id)
    return axios.get(`http://localhost:8080/trip/getCityByCityId/${id}`)
}
export const GetAllCities = () => {
    return axios.get(`http://localhost:8080/cityManager/getAllCities`)
}
export const GetCuntryByContinentId = (id) => {
    console.log(id)
    return axios.get(`http://localhost:8080/cityManager/getCuntryByContinentId/${id}`)
}