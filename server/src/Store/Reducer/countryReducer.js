import * as ActionTypes from "../ActionTypes";
const initialState = {
    currentCountry: null,
    arrCountries: [],
    arrPictures:[]
}
const CountryReducer = (state = initialState, action) => {

    // console.log("countryReducer")
    // console.log(action)

    switch (action.type) {
        case ActionTypes.SAVE_COUNTRIES:
            return {
                ...state,
                arrCountries: action.payload
            }
        case ActionTypes.SELECTED_COUNTRY:
            return {
                ...state,
                currentCountry: action.payload
            }
        case ActionTypes.UPDATE_CUNTRY:
            return {
                ...state,
                currentCountry: action.payload
            }

         case ActionTypes.SAVE_ARRPICTURES:
            return {
                ...state,
                arrPictures: action.payload
            }
    }
    return state;

}
export default CountryReducer;