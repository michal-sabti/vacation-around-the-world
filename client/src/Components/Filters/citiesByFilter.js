import { useDispatch } from "react-redux";
import { saveCity } from "../../Store/Action/tripAction";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { isEqual } from 'lodash';

export default function CitiesByFilter() {
    // location.state - אנו משתמשים ב useNavigate כדי לגשת למערך שהעברנו באמצעות 
    const location = useLocation();
    let [Cities, setCities] = useState(location.state.names);

    let dispatch = useDispatch();

    useEffect(() => {
        // מוריד כפילויות מהמערך
        console.log(Cities, "before")
        const unique = Cities.filter(
            (obj, index) =>
                Cities.findIndex((item) => item.id == obj.id) == index);
        console.log(unique, "after")
        setCities(unique);
    }, [])

    const saveCurrentCity = (item) => {
        console.log(item);
        dispatch(saveCity(item));
    }

    return <>
    {/* לפני שמביא את העיר לעשות איקון טעינה דף - מטוס מסתובב */}
        <br/><br/><h2> הערים שנמצאו ... </h2>
        {/* <img src="/200.jpg"  id="after-filter-pic-country" /> */}

        <ul className="ul-cities">
            {Cities.length != 0 ?
                      <Link to='/oneCity' className="city-names">
                      {Cities.map(item => <li onClick={() => { saveCurrentCity(item) }}>
                          <h2>{item.name}</h2>
                          {<img src={"/pic-city/" + item.pic} />}
                      </li>)}
                  </Link>
                // <Link to='/oneCity'>
                //     {Cities.map(item => <li className="city-names" onClick={() => { saveCurrentCity(item) }}>
                //         {item.name}<br/>
                //         {<img src={"/pic-city/" + item.pic} />}
                //         {/* {console.log(item.pic)} */}
                //     </li>)}
                // </Link> 
               : <><h2> לא נמצאו ערים מתאימות ! </h2><br />
                    <SearchOffIcon />
                </>}
        </ul>
    </>
}
