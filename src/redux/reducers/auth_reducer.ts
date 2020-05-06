import { Auth } from '../actions/type';

interface IInitialState {
    session_token: null
}

interface IAction {
    type: Auth,
    payload: string
}

const initialState: IInitialState = {
    session_token: null
}

export const authReducer = (state = initialState, action: IAction ) => {
    switch (action.type) {
        case Auth.LOGIN:
            return {
                ...state,
                session_token: action.payload
            }
        default:
            return state;
    }
}