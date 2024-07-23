import * as ActionTypes from "../ActionTypes";

const initialState = {
    hotelArr: [],
    selectedHotel: null,
    editHotel:null
}

const hotelReducer = (state = initialState, action) => {

    console.log("hotel ------------------ Reducer")
    console.log(action)

    switch (action.type) {
        case ActionTypes.SAVE_HOTELS:
            return {
                ...state,
                hotelArr: action.payload
            }
        case ActionTypes.SELECTED_HOTEL:
            return {
                ...state,
                selectedHotel: action.payload
            }
        case ActionTypes.EDIT_HOTEL:
            return {
                ...state,
                editHotel: action.payload
            }
    }
    return state;
}
export default hotelReducer;