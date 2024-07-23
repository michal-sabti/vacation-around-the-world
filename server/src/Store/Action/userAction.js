import * as ActionTypes from "../ActionTypes";

export const saveUser = (user) => {
    return {
        type: ActionTypes.SAVE_USER,
        payload: user
    }
}

export const saveUsers = (users) => {
    return {
        type: ActionTypes.SAVE_USERS,
        payload: users
    }
}
