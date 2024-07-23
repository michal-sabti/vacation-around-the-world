import axios from "axios";
export const GetAllCuntries=()=>{
    return axios.get("http://localhost:8080/trip/getAllCountries");
}
export const filterHomePage=(inpSearch)=>{
    return axios.get(`http://localhost:8080/trip/filterHomePage/${inpSearch}`);
}
export const getRecommendedCountry=()=>{
    return axios.get("http://localhost:8080/trip/getRecommendedCountry");
}
// export const GetAllContinents=()=>{
//     return axios.get("http://localhost:8080/cityManager/getAllContinents");
// }