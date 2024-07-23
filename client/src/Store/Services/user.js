import axios from "axios"

export const LogIn = (details) => {
    console.log(details)
    return axios.post(`http://localhost:8080/user/login`, details);
}
export const signup = (details) => {
    return axios.post(`http://localhost:8080/user/signUp`, details);
}
export const showAllUsers = () => {
    return axios.get(`http://localhost:8080/user/showAllUsers`);
}
export const changActiveUser = (id) => {
    return axios.put(`http://localhost:8080/user/changActiveUser/${id}`);
}
export const EditPersonalInf = (id, name, phone, email) => {
    const details = {
        name: name,
        phone: phone,
        email: email,
    };
    return axios.put(`http://localhost:8080/user/editPersonalInf/${id}`, details);
}