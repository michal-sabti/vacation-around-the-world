import "./city.scss";
import { useDispatch, useSelector } from "react-redux";
import { saveTrips } from "../../Store/Action/tripAction";
import OneTrip from "../Trip-Hotel/Trip/OneTrip";
import "../Trip-Hotel/Scss/trip.scss";
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { Button } from "@mui/material";
import { GetAllTripsByCityId, getTop5ByCityId } from "../../Store/Services/trip";
import { GetAllHotelsByCityId } from "../../Store/Services/hotel";
import { saveHotels } from "../../Store/Action/hotelAction";
import OneHotel from "../Trip-Hotel/Hotel/OneHotel";
import { CheckPicker } from 'rsuite';
import { GetAllCategoty } from "../../Store/Services/filter";

import HotelIcon from '@mui/icons-material/Hotel';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import KingBedIcon from '@mui/icons-material/KingBed';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export const OneCity = () => {

    let dispatch = useDispatch();
    let currentCity = useSelector((state) => state.city.currentCity);
    console.log(currentCity)

    let [top5Trip, setTop5Trip] = React.useState([]);
    let [ShowTop5Trip, setShowTop5Trip] = React.useState(false);
    let [top5Hotel, setTop5Hotel] = React.useState([]);
    let [ShowTop5Hotel, setShowTop5Hotel] = React.useState(false);
    let [category, setCategorys] = React.useState([]);
    const [changText, setChangText] = React.useState(false);
    const [showAllCategory, setShowAllCategory] = React.useState(false);
    const [showCategoryDiv, setshowCategoryDiv] = React.useState(true);


    React.useEffect(() => {
        GetAllTripsByCityId(currentCity.id).then(res => {
            dispatch(saveTrips(res.data))
        }).catch(err => err.message);

        GetAllHotelsByCityId(currentCity.id).then(res => {
            console.log("res.data hotel")
            console.log(res.data)
            dispatch(saveHotels(res.data))
        }).catch(err => err.message);

        getTop5ByCityId(currentCity.id).then(res => {
            console.log("res.data in top 5")
            console.log(res.data)
            setTop5Trip(res.data.trips);
            setTop5Hotel(res.data.hotels);
        })

        GetAllCategoty()
            .then((res) => {
                setCategorys(res.data);
            })
    }, [])

    let trips = useSelector((state) => state.trip.tripArr);
    let hotels = useSelector((state) => state.hotel.hotelArr);
    let [inpSearch, setInpSearch] = React.useState("");

    // מערכים אחרי סינון
    let [arrTrips, setArrTrips] = React.useState([]);
    // מציג מערך אחרי סינון  flag = true אם ה
    let [flag, setFlag] = React.useState(false);

    let [showTrip, setShowTrip] = React.useState(true);
    let [showHotel, setShowHotel] = React.useState(true);

    const filter = (e) => {
        e.preventDefault();
        console.log("filter price", inpSearch);
        setArrTrips(trips.filter((item) => { return item.price <= inpSearch }));
        // setArrHotels(hotels.filter((item) => { return item.price <= inpSearch }));
        setFlag(true);

        //'after-filter' גרילה לאלמנט עם המזהה 
        setTimeout(() => {
            const element = document.getElementById('after-filter');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    const showAllCategorys = () => {
        setShowAllCategory(!showAllCategory);
        setChangText(!changText);
    }

    const showCategorys = () => {
        setShowTrip(false);
        setShowHotel(false);
        setshowCategoryDiv(true);
        //'div-show-all-category' גרילה לאלמנט עם המזהה 
        setTimeout(() => {
            const element = document.getElementById('div-show-all-category');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }
    const showAll = () => {
        console.log("show allll")
        setFlag(false);
        setShowTrip(true);
        setShowHotel(true);
        setshowCategoryDiv(true);
    }

    const showTripsOrHotels = (num) => {
        if (num == 1) {
            setShowTrip(true);
            setShowHotel(false);
            setTimeout(() => {
                const element = document.getElementById('trips');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
        if (num == 2) {
            setShowTrip(false);
            setShowHotel(true);
            setTimeout(() => {
                const element = document.getElementById('hotels');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
        setShowTop5Trip(false);
        setShowTop5Hotel(false);
        setshowCategoryDiv(false);
        setFlagForSelectedCategory(false);
    }

    const top5 = (num) => {
        if (num == 1) {
            console.log('in top 5 trip')
            setShowTop5Hotel(false);
            setShowTop5Trip(true);
            setTimeout(() => {
                const element = document.getElementById('top5trips');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
        else {
            console.log('in top 5 hotel')
            setShowTop5Trip(false);
            setShowTop5Hotel(true);
            setTimeout(() => {
                const element = document.getElementById('top5hotels');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
        setShowTrip(false);
        setShowHotel(false);
        setshowCategoryDiv(false);
        setFlagForSelectedCategory(false);
    }

    const [selectedCategory, setSelectedCategory] = React.useState([]);
    const [nameCategory, setNameCategory] = React.useState("");
    const [flagForSelectedCategory, setFlagForSelectedCategory] = React.useState(false);

    const clickOnCategory = (category1) => {
        console.log("category id")
        console.log(category1.id);
        setNameCategory(category1.nameCategory);
        setSelectedCategory(trips.filter(item => item.category == category1.id));
        console.log(selectedCategory);
        setFlagForSelectedCategory(true);
        setShowTrip(false);
        setShowHotel(false);
        setShowTop5Trip(false);
        setShowTop5Hotel(false);

        //'selectedCategory'  גרילה לאלמנט עם המזהה 
        // document.getElementById('rool').scrollIntoView({ behavior: 'smooth' });

        //'filterCategory' גרילה לאלמנט עם המזהה 
        setTimeout(() => {
            const element = document.getElementById('filterCategory');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }


    return <>
        <h1>{currentCity.name}</h1>
        <h3 id="h3-desc">{currentCity.description}</h3>

        <div id="div-paper-filter">
            <Paper id="filter-price"
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, backgroundColor: "rgb(186, 195, 214)" }}>
                <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: 17 }}
                    placeholder="הכנס מחיר מקסימאלי"
                    type="number"
                    onChange={(e) => setInpSearch(e.target.value)}
                    onKeyDown={(e) => { if (e.key == "Enter") filter(e); }}
                />
                <IconButton type="button" sx={{ p: '10px', color: " rgb(91, 125, 199)" }} aria-label="search" onClick={filter}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Button id="showAll" onClick={() => showAll()}>הצג הכל</Button>

            <div id="div2-in-serch">
                <li onClick={() => showTripsOrHotels(2)}><KingBedIcon /><h6>מלונות </h6></li>
                <li onClick={() => top5(2)}><HotelIcon /> <h6>טופ 5 מלונות</h6></li>
                <li onClick={() => showTripsOrHotels(1)}><LoyaltyIcon /><h6> אטרקציות</h6></li>
                <li onClick={() => top5(1)}><CardTravelIcon /> <h6>טופ 5 אטרקציות</h6></li>
                <li onClick={() => showCategorys()}><TravelExploreIcon /><h6>קטגוריות </h6></li>
            </div>
        </div>

        {showCategoryDiv &&
            <div id="div-show-all-category">
                <h4 className="title">מה הסגנון חיים שלך ? </h4>
                <Button className="titel-button" onClick={() => showAllCategorys()}>
                    {changText ? 'הסתר חלק מהקטגוריות   »  ' : '  הצג את כל הקטגוריות  » '}
                </Button>

                <ul className="category-ul">
                    {(showAllCategory ? category : category.slice(0, 6)).map((item) => (
                        <li className="category-li">
                            <div onClick={() => clickOnCategory(item)}>
                                <img src={item.picCategory} />
                                <h3 >{item.nameCategory} </h3>
                            </div>
                        </li>
                    ))}
                </ul>  <hr />
            </div >}

        <ul className="ul-trip">
            {!flag ? (
                <>
                    {/* כל האטרקציות */}
                    {showTrip && <label id="trips" className="like">  אטרקציות <span>«</span></label>}
                    {showTrip && trips && trips.map(item => (
                        <li key={item.id} className="li-trip">
                            <OneTrip myTrip={item} />
                        </li>
                    ))}
                    {/* טופ 5 אטרקציות */}
                    {ShowTop5Trip && <label id="top5trips" className="like"> טופ 5 אטרקציות <span>«</span></label>}
                    {ShowTop5Trip && top5Trip && top5Trip.map(item => (
                        <li key={item.id} className="li-trip">
                            <OneTrip myTrip={item} />
                        </li>
                    ))}
                    {/* הצגת אטרקציות לפי קטגוריה שבחר */}
                    {flagForSelectedCategory && <label id="filterCategory" className="like"> {nameCategory} <span>«</span></label>}
                    {flagForSelectedCategory && selectedCategory && selectedCategory.map(item => (
                        <li key={item.id} className="li-trip">
                            <OneTrip myTrip={item} />
                        </li>
                    ))}
                    {/* כל המלונות */}
                    {showHotel && <label id="hotels" className="like">  בתי מלון <span>«</span></label>}
                    {showHotel && hotels && hotels.map(item => (
                        <li key={item.id} className="li-trip">
                            <OneHotel myHotel={item} />
                        </li>
                    ))}
                    {/* טופ 5 מלונות */}
                    {ShowTop5Hotel && <label id="top5hotels" className="like"> טופ 5 בתי מלון  <span>«</span></label>}
                    {ShowTop5Hotel && top5Hotel && top5Hotel.map(item => (
                        <li key={item.id} className="li-trip">
                            <OneHotel myHotel={item} />
                        </li>
                    ))}

                </>
                // אחרי סינון לפי טווח מחירים
            ) : (arrTrips.length > 0) ? (
                <>
                    {arrTrips.length > 0 && (<>
                        <label className="like" id="after-filter">  אטרקציות <span>«</span></label>
                        {arrTrips.map(item => (
                            <li key={item.id} className="li-trip">
                                <OneTrip myTrip={item} />
                            </li>
                        ))}</>
                    )}
                </>
            ) : (
                <h2>לא נמצאו התאמות</h2>
            )}
        </ul>
    </>
}