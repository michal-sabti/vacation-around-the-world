import SearchIcon from "@mui/icons-material/Search";
import "./homePage.scss";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { filterHomePage, getRecommendedCountry } from "../Store/Services/country";
import { Link, useNavigate } from "react-router-dom";
import { saveCity, selectedCountry, savePictures, saveCuntries } from "../Store/Action/tripAction";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import "./item.css";
import "./City/city.scss";
import Swal from "sweetalert2";
import { GetAllCities } from "../Store/Services/city";
import { GetPopularDestinations } from "../Store/Services/trip";

export const HomePage = () => {

  let [popular, setPopular] = React.useState([]);
  const arrPic = useSelector((state) => state.country.arrPictures);
  let [inpSearch, setInpSearch] = React.useState("");
  let [cities, setCities] = React.useState([]);
  let dispatch = useDispatch();
  let nav = useNavigate();

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  React.useEffect(() => {
    getRecommendedCountry().then((res) => {
      dispatch(savePictures(res.data));
    })
      .catch((err) => err.message);

    GetAllCities().then((res) => {
      setCities(res.data);
    })
      .catch((err) => err.message);

    GetPopularDestinations().then((res) => {
      setPopular(res.data);
    })
      .catch((err) => err.message);
  }, []);

  const filter = (e) => {
    e.preventDefault();
    console.log("filter", inpSearch);
    //  inpSearch="צרפת";
    filterHomePage(inpSearch).then((res) => {
      console.log(inpSearch);
      console.log(res.data.type);

      if (res.data.type == null)
        Swal.fire({ icon: 'error', text: res.data.message });

      if (res.data.type == "country") {
        dispatch(selectedCountry(res.data[0]));
        nav("/city");
      } else if (res.data.type == "city") {
        dispatch(saveCity(res.data[0]));
        nav("/oneCity");
      }
    });
  };
  const setIdCity = (item) => {
    dispatch(selectedCountry(item));
  };
  const saveCurrentCity = (item) => {
    console.log(item);
    dispatch(saveCity(item));
  }
  const saveCurrentCountry = (item) => {
    dispatch(selectedCountry(item));
  };

  const [value, setValue] = React.useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div id="div-paper-filter">
        <Paper id="search" component="form" sx={{ p: "3px 5px" }} >
          <IconButton
            type="button"
            sx={{ p: "10px", color: " rgb(91, 125, 199)" }}
            aria-label="search"
            onClick={filter}
          >
            <SearchIcon />
          </IconButton>

          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 18 }}
            placeholder="   איפה החופשה הבאה שלך ?"
            onChange={(e) => setInpSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") filter(e);
            }}
          />
          <button id="button-search" onClick={filter}>חפש</button>
        </Paper>
      </div>

      <h2 className="class-h2">יעדים פופולריים <span>«</span></h2>
      <div>
        <Carousel breakPoints={breakPoints}>
          {popular.map((item) => (
            <Link to="/city">
              <div className="item" onClick={() => setIdCity(item)}>
                <img src={"/pic/" + item.pic} />
                <h3 id="carousel-h3">{item.name}</h3>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>

      <h2 className="class-h2">  ערים מסביב לעולם <span>«</span></h2>
      <ul className="ul-cities">
        <Link to='/oneCity' className="city-names" >
          {cities && cities.map(item => <li onClick={() => { saveCurrentCity(item) }}>
            <h2>{item.name}</h2>
            {<img src={"/pic-city/" + item.pic} />}
          </li>)}
        </Link>
      </ul>
    </>
  );
};
