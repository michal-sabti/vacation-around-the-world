
import * as ActionTypes from "../ActionTypes";

const initialState = {
    currentUser: null,
    arr: []
}

const userReducer = (state = initialState, action) => {

    // console.log("userReducer")
    // console.log(action)

    switch (action.type) {
        case ActionTypes.SAVE_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case ActionTypes.SAVE_USERS:
            return {
                ...state,
                arr: action.payload
            }
    }
    return state;
}
export default userReducer;