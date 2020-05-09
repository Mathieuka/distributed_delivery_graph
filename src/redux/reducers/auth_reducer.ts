import { Auth } from '../actions/type';

interface IInitialState {
	tokenSession: null;
}

interface IAction {
	type: Auth;
	payload: string;
}

const initialState: IInitialState = {
	tokenSession: null,
};

export const authReducer = (state = initialState, action: IAction) => {
	switch (action.type) {
		case Auth.LOGIN:
			return {
				...state,
				tokenSession: action.payload,
			};
		default:
			return state;
	}
};
