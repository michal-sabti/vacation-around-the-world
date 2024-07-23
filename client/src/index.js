import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import userReducer from './Store/Reducer/userReducer';
import tripReducer from './Store/Reducer/tripReducer';
import countryReducer from "./Store/Reducer/countryReducer";
import cityReducer from "./Store/Reducer/cityReducer";
import hotelReducer from './Store/Reducer/hotelReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const xstore = createStore(combineReducers({
  user: userReducer, trip: tripReducer, hotel: hotelReducer, country: countryReducer, city: cityReducer
}));

root.render(
  <React.StrictMode>
    <Provider store={xstore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
