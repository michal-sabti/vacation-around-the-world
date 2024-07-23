import React from "react";
import { GetCuntryByContinentId } from "../../Store/Services/city";


export default function ShowCountryByContinent(id) {
    console.log(id)

    // React.useEffect(() => {
        // מביא את כל היבשות
    //     GetCuntryByContinentId(id).then((res) => {
    //       console.log(res.data);
    //     })
    //   }, []);



    return (
        <h1>{id}</h1>
    )
}