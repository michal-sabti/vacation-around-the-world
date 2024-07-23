import { Link, useNavigate } from 'react-router-dom';
import About from './About/About';
import './homePage.scss';
import { Button } from 'rsuite';
import PublicOpinionIcon from '@rsuite/icons/PublicOpinion';
import EmailIcon from '@rsuite/icons/Email';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {

    const nav = useNavigate();

    return (<>
        <div id="footer">
            {/* <img src="/gif3.jpg" alt="Loading" id="footer-loaging" /> */}
            <div className='div-footer'>
                <Link className='but' to='/about'> <PublicOpinionIcon />  אודות   </Link>
                <Link className='but' to='/PersonalPlace'>  <PersonOutlineRoundedIcon />   אזור אישי   </Link>
                <Link className='but' to='/about'>  <EmailIcon /> צרו קשר  </Link>
            </div>

            <h5> ! ! ! ברוכים הבאים לנופשים מסביב לעולם <br />
                כאן אתם יכולים למצוא חופשות, טיולים ואטרקציות מסביב לעולם.<br />
                כל הארצות והערים<br />... טיולים מכל הסוגים  <br />
                ! אנחנו כאן לעזור לך למצוא את החופשה המושלמת בשבילך
                <br /> <FlightRoundedIcon />...  טיסה נעימה
            </h5><br /><br /><br />

            <FacebookIcon />  <InstagramIcon />  <TwitterIcon />  <YouTubeIcon /><br /><br />

            <h6>   v2649789@gmail.com    --    מייל האתר <EmailIcon />  </h6>
            <h6> Copyright © 2023. Created by michal-sabti && shira-hanuna * חופשות מסביב לעולם ברשת 2023 © כל הזכויות שמורות.</h6>

            {/* <img src="/200.jpg" id="footer-loaging"/><br/><br/><br/><br/> */}
            <img src="/pic1.jpg"  id="footer-loaging"/>
        </div>
    </>)
}