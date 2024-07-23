import './App.css';
import './app.scss';
import NavBar from './Components/NavBar';
import { Login } from './Components/Login-Signup/login';
import { HomePage } from "./Components/HomePage";
import ListCountry from "./Components/Country/ListCountry";
import About from "./Components/About/About";
import { Route, Routes } from "react-router-dom";
import { SignUp } from './Components/Login-Signup/SignUp';
import { DropWindow } from './Components/Login-Signup/dropWindow';
import TripDetails from './Components/Trip-Hotel/Trip/TripDetails';
import City from './Components/City/ListCity';
import { OneCity } from './Components/City/OneCity';
import Filter from './Components/Filters/filter';
import CitiesByFilter from './Components/Filters/citiesByFilter';
import { Personal } from './Components/Personal/Personal';
import { PersonalPlace } from './Components/Personal/PersonalPlace';
import ChangLook from './Components/Site-Manager/ChangLook';
import { useSelector } from "react-redux";
import AddCityManager from './Components/Site-Manager/AddCityManager';
import ShowAllTrip from './Components/Owner-Attraction/showAllTrip';
import AddAndEditAttraction from './Components/Owner-Attraction/AddTrip/AddAndEditAttraction';
import Graphs from './Components/Site-Manager/Statistics/Graphs';
import { useState } from 'react';
import AddAndEditHotel from './Components/Owner-Attraction/AddHotel/AddAndEditHotel';
import HotelDetails from './Components/Trip-Hotel/Hotel/hotelDetails';
import TripStepper from './Components/Trip-Hotel/Trip/TripStepper';
import HotelStepper from './Components/Trip-Hotel/Hotel/HotelStepper';
import Footer from './Components/Footer';
import { ShowAllInvite } from './Components/Owner-Attraction/showAllInvite';
import { ChooseDate } from './Components/Owner-Attraction/chooseDate';
import { OneCategory } from './Components/Category/OneCategory';
import ChooseWhatAdd from './Components/additions/chooseWhatAdd';

function App() {
  let user = useSelector(state => state.user.currentUser);
  const [isLogin, setIsLogin] = useState(false);
  const [isSingUp, setIsSingUp] = useState(false);

  return (
    <>
      <header id='header'></header>
      <h6 id='h6-on'>Copyright © 2023. Created by michal-sabti && shira-hanuna * חופשות מסביב לעולם ברשת 2023 © כל הזכויות שמורות.</h6>
      <div id="up-div">
        <h5>LET US TAKE YOU TO YOUR</h5>
        <h2>DREAM DESTINASIONS</h2>
        <h6> - vacation around the world - </h6>
      </div>

      <DropWindow isLogin={isLogin} setIsLogin={setIsLogin} isSingUp={isSingUp} setIsSingUp={setIsSingUp} />
      {isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin} />}
      {isSingUp && <SignUp isSingUp={isSingUp} setIsSingUp={setIsSingUp} />}
      <Personal />
      <NavBar />

        <Routes>
          <Route path='home' element={<HomePage />} />
          <Route path='about' element={<About />} />
          <Route path='country' element={<ListCountry />} />
          <Route path='login' element={<Login isOrder={false} />} />
          <Route path='login/order' element={<Login isOrder={true} />} />{/* ///////////// */}
          <Route path='/' element={<HomePage />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='DropWindow' element={<DropWindow />} />
          <Route path='personal' element={<Personal />} />
          <Route path='PersonalPlace' element={<PersonalPlace />} />
          <Route path='city' element={<City />} />
          <Route path='oneCity' element={<OneCity />} />
          <Route path='tripDetails' element={<TripDetails />} />
          <Route path='hotelDetails' element={<HotelDetails />} />
          <Route path='filter' element={<Filter />} />
          <Route path='citiesByFilter' element={<CitiesByFilter />} />
          <Route path='changLook' element={<ChangLook />} />
          <Route path='addCityManager' element={<AddCityManager />} />
          <Route path='graphs' element={<Graphs />} />
          <Route path='showAllTrip' element={<ShowAllTrip />} />
          <Route path='showAllInvite' element={<ShowAllInvite />} />
          <Route path='showAllInvite' element={<ShowAllInvite />} />
          <Route path='chooseDate' element={<ChooseDate />} />
          <Route path='stepperTrip' element={<TripStepper />} />
          <Route path='stepperTrip/:date' element={<TripStepper />} />
          <Route path='stepperHotel' element={<HotelStepper />} />
          <Route path='stepperHotel/:dateRange' element={<HotelStepper />} />
          <Route path='AddEndEditAttraction/:id' element={<AddAndEditAttraction type="edit" />} />
          <Route path='AddEndEditAttraction' element={<AddAndEditAttraction type="new" />} />
          <Route path='AddEndEditHotel' element={<AddAndEditHotel type="new" />} />
          <Route path='AddEndEditHotel/:id' element={<AddAndEditHotel type="edit" />} />
          <Route path='chooseWhatAdd' element={<ChooseWhatAdd flag={true} />} />
          <Route path='/oneCategory' element={<OneCategory />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
