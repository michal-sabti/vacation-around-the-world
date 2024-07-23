import * as ActionTypes from "../ActionTypes";

export const saveHotels= (hotels) => {
    return {
        type: ActionTypes.SAVE_HOTELS,
        payload: hotels
    }
}
export const selectedHotel = (hotel) => {
    return {
        type: ActionTypes.SELECTED_HOTEL,
        payload: hotel
    }
}
export const editHotel = (hotel) => {
    return {
        type: ActionTypes.EDIT_HOTEL,
        payload: hotel
    }
}
