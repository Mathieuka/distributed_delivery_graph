import { Auth } from './type';
import axios from '../../axios';

export const logInAction = (identifier: string, password: string) => {
	return async (dispatch: any) => {
		const body = {
			identifier: identifier,
			password,
		};
		const response = await axios.post('/auth', body);
		switch (response.status) {
			case 200:
				dispatch({ type: Auth.LOGIN, payload: response.data.session_token });
				break;
			case 500:
				throw new Error('Error:: Server Error');
			case 404:
				throw new Error('Error:: Not Found');
			case 403:
				throw new Error('Error:: forbidden');
			default:
				break;
		}
	};
};

export const logOutAction = (session_token: string) => {
	return async (dispatch: any) => {
		const body = {
			session_token,
		};
		const response = await axios.post('/logout', body);
		switch (response.status) {
			case 200:
				dispatch({ type: Auth.LOGOUT, payload: response.data.session_token });
				break;
			case 500:
				throw new Error('Error:: Server Error');
			case 404:
				throw new Error('Error:: Not Found');
			case 403:
				throw new Error('Error:: forbidden');
			default:
				break;
		}
	};
};
