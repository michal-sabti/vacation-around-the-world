import * as ActionTypes from "../ActionTypes";

export const saveCuntries = (country) => {
    return {
        type: ActionTypes.SAVE_COUNTRIES,
        payload: country
    }
}
export const saveCity = (city) => {
    return {
        type: ActionTypes.SAVE_CITY,
        payload: city
    }
}
///ערים///
export const saveCities = (citys) => {
    return {
        type: ActionTypes.SAVE_CITIES,
        payload: citys
    }
}

export const saveTrips= (trips) => {
    return {
        type: ActionTypes.SAVE_TRIPS,
        payload: trips
    }
}

export const selectedTrip = (trip) => {
    return {
        type: ActionTypes.SELECTED_TRIPS,
        payload: trip
    }
}
export const editTrip = (trip) => {
    return {
        type: ActionTypes.EDIT_TRIP,
        payload: trip
    }
}
export const updateCountry = (country) => {
    return {
        type: ActionTypes.UPDATE_CUNTRY,
        payload: country
    }
}
export const updateCity = (city) => {
    return {
        type: ActionTypes.UPDATE_CITY,
        payload: city
    }
}
export const selectedCountry = (country) => {
    return {
        type: ActionTypes.SELECTED_COUNTRY,
        payload: country
    }
}
export const selectedCity = (city) => {
    return {
        type: ActionTypes.SELECTED_CITY,
        payload: city
    }
}

export const savePictures = (arrPictures) => {
    return {
        type: ActionTypes.SAVE_ARRPICTURES,
        payload: arrPictures
    }
}
export const saveInviteArr = (arrInvite) => {
    return {
        type: ActionTypes.INVITE_ARR,
        payload: arrInvite
    }
}