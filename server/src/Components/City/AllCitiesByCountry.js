import { useEffect } from "react";
import { Link } from "react-router-dom";
import { saveCity } from "../../Store/Action/tripAction";


export default function AllCitiesByCountry({countryId}) {
    console.log(countryId)

    // const saveCurrentCity = (item) => {
    //     console.log(item);
    //     dispatch(saveCity(item));
    //   }

    return (<>
      <ul className="ul-cities">
        <Link to='/oneCity' className="city-names" >
          {/* {cities && cities.map(item => <li onClick={() => { saveCurrentCity(item) }}>
            <h2>{item.name}</h2>
            {<img src={"/pic-city/" + item.pic} />}
          </li>)} */}
        </Link>
      </ul>
    </>)
}
