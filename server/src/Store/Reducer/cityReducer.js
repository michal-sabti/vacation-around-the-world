import * as ActionTypes from "../ActionTypes";

const initialState = {
    arrCities: [],
    currentCity: null
}

const cityReducer = (state = initialState, action) => {

    // console.log("cityReducer")
    // console.log(action)

    switch (action.type) {
        case ActionTypes.SAVE_CITY:
            return {
                ...state,
                currentCity: action.payload
            }
        case ActionTypes.SAVE_CITIES:
            return {
                ...state,
                arrCities: action.payload
            }
    }
    return state;
}
export default cityReducer;