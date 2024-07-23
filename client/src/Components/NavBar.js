import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./navBar.scss";
import { useEffect, useState } from "react";
export default function NavBar() {
  let user = useSelector(state => state.user.currentUser);
  const [flag, setFlag] = useState(false);
  console.log(user, "  --------------------------")

  useEffect(() => {
    var links = document.querySelectorAll('li a');

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        //links מכל ה 'selected' מסיר רת הקלאס 
        links.forEach(function (link) {
          link.classList.remove('selected');
        });
        //'selected' הופך את הקלאס שלו ל 
        this.classList.add('selected');
      });
    });
  }, []);

  return <>
    <nav id="nav-bar" >
      <ul>
        <li><b><Link to='home'>דף הבית</Link></b></li>
        <li><b><Link to='country'>מדינות</Link></b></li>
        <li><b><Link to='about'>אודות</Link></b></li>
        {/* <li><b><Link to='addTrip'><AddIcon fontSize="medium"/></Link></b></li> */}
        <li><b><Link to='chooseWhatAdd'>הוספות</Link></b></li>

        {user ? user.kindUser == 2 ? <>
          <li><b><Link to='showAllTrip'>צפייה באטרקציות</Link></b></li>
        </>
          : null : null
        }

        {user ? user.kindUser == 3 ? <>
          {/* <li><b><Link to='changLook'>עדכון תצוגת אתר</Link></b></li> */}
          <li><b><Link to='addCityManager'>פניות משתמשים</Link></b></li>
          <li><b><Link to='graphs'>גרפים</Link></b></li></>
          : null : null
        }
      </ul>
    </nav>
  </>
}