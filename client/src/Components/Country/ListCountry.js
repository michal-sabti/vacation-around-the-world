import { GetAllCuntries } from "../../Store/Services/country";
import { useDispatch, useSelector } from "react-redux";
import { saveCuntries, selectedCountry } from "../../Store/Action/tripAction";
import { useEffect } from "react";
import "./oneCountry.scss";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Country() {
  let dispatch = useDispatch();
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration in milliseconds
      once: true,      // Whether to only animate elements once
      easing: 'ease',  // Easing function for the animation
      // More options...
    });
    AOS.refresh();
  }, []);
  
  useEffect(() => {
    GetAllCuntries().then((res) => {
      console.log(res);
      dispatch(saveCuntries(res.data));
    })
      .catch((err) => {
        console.log(err);
        alert("התרחשה שגיאה בקבלת המדינות");
      });
  }, []);

  let arr = useSelector((state) => state.country.arrCountries);
  console.log(arr + "arr");
  const saveCurrentCountry = (item) => {
    // console.log(id + "id")
    dispatch(selectedCountry(item));
  };
  return (
    <>
      <div id="country-div">
        <h2 className="class-h2">באתר יש הצעות למדינות רבות ברחבי העולם בהן אתה יכול לטייל <span>«</span></h2>
        <ul>
          {/* לולאה שעוברת על המערך שהתקבל  */}
          <Link to="/city" id="link-country">
            {arr.map(item => <li key={item.id} onClick={() => { saveCurrentCountry(item) }} data-aos="zoom-out-up">
              <h2>{item.name}</h2>
              {<img src={"/pic/" + item.pic} />}
            </li>)}
          </Link>
        </ul>
      </div>
    </>
  );
}
