import { useEffect } from "react";
import { GetAllCitiesByCountryId } from "../../Store/Services/city";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveCities } from "../../Store/Action/tripAction";
import { saveCity } from "../../Store/Action/tripAction";
import { Button, Stack } from "rsuite";

export default function City() {

    let dispatch = useDispatch();
    let nav = useNavigate();
    let country = useSelector(state => state.country.currentCountry);
    console.log(country.id + "id country")

    let arrCities = useSelector((state) => state.city.arrCities);
    console.log(arrCities);

    useEffect(() => {
        GetAllCitiesByCountryId(country.id).then(res => {
            console.log("הערים שנשמרו הם", res.data)
            dispatch(saveCities(res.data))
        }).catch(err => { console.log(err); alert("התרחשה שגיאה בקבלת הערים") })
    }, [])
    console.log(country.name);



    const saveCurrentCity = (item) => {
        console.log(item);
        dispatch(saveCity(item));
    }
    // let currentCity = useSelector((state) => state.city.currentCity);
    const filterDestination = () => {
        nav("/filter");
    }


    return (<>
        {<img className="img-country" src={"/pic/" + country.pic}></img>}
        <h1 id="country-name">{country.name}</h1>
        <h4 id="country-description">{country.description}</h4>

        <Stack spacing={2} direction="row">
            <Button variant="contained" id="search-trip-city" onClick={() => { filterDestination() }}>מציאת חופשה לפי ...</Button>
        </Stack>
        
        <ul className="ul-cities">
            <Link to='/oneCity' className="city-names">
                {arrCities && arrCities.map(item => <li onClick={() => { saveCurrentCity(item) }}>
                    <h2>{item.name}</h2>
                    {<img src={"/pic-city/" + item.pic} />}
                </li>)}
            </Link>
            {/* <Link to='/oneCity'>
                {arrCities.map(item => <li key={item.id} className="city-names" onClick={() => { saveCurrentCity(item) }}>
                    {item.name}
                </li>)
                }
            </Link> */}

            {/* {<img className="img-country" src={"/pic/"+country.pic}></img>} */}

            {/* <input id="search-trip" type="button" value="מציאת חופשה לפי..." ></input> */}
        </ul>
    </>)
}
