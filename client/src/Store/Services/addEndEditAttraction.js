import axios from "axios";
export const AddAttraction = (object) => {
  return axios.post("http://localhost:8080/addAttraction/addTrip", object);
};
export const UpdateTrip = (object) => {
  return axios.put("http://localhost:8080/editAttraction/updateAttraction", object);
};
