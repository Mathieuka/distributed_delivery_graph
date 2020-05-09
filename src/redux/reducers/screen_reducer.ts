import { UI } from '../actions/type';

interface IInitialState {
	isSmallScreen: boolean;
}

interface IAction {
	type: UI;
	payload: boolean;
}

const initialState: IInitialState = {
	isSmallScreen: false,
};

export const screenReducer = (state = initialState, action: IAction) => {
	switch (action.type) {
		case UI.IS_SMALL_SCREEN:
			return {
				...state,
				isSmallScreen: action.payload,
			};
		default:
			return state;
	}
};
