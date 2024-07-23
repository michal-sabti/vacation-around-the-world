import * as ActionTypes from "../ActionTypes";

const initialState = {
    tripArr: [],
    inviteArr:[],
    // hotelArr: [],
    selectedTrip: null,
    editTrip:null
}

const tripReducer = (state = initialState, action) => {

    // console.log("tripReducer")
    // console.log(action)

    switch (action.type) {
        case ActionTypes.SAVE_TRIPS:
            return {
                ...state,
                tripArr: action.payload
            }
        // case ActionTypes.SAVE_HOTELS:
        //     return {
        //         ...state,
        //         hotelArr: action.payload
        //     }
        case ActionTypes.SELECTED_TRIPS:
            return {
                ...state,
                selectedTrip: action.payload
            }
        case ActionTypes.EDIT_TRIP:
            return {
                ...state,
                editTrip: action.payload
            }
        case ActionTypes.INVITE_ARR:
            return {
                ...state,
                inviteArr: action.payload
            }
    }
    return state;
}
export default tripReducer;