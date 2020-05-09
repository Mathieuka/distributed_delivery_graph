import { Data } from './type';
import axios from '../../axios';

export const getBandwidth_Action = (session_token: string, timeline: any) => {
	return async (dispatch: any) => {
		const bandwidthBody = {
			session_token,
			from: timeline.from,
			to: timeline.to,
		};
		const bandwidthResponse = await axios.post('/bandwidth', bandwidthBody);
		const bandwidthSumBody = {
			session_token,
			from: timeline.from,
			to: timeline.to,
			aggregate: 'sum',
		};
		const bandwidthSumResponse = await axios.post(
			'/bandwidth',
			bandwidthSumBody
		);

		switch (bandwidthResponse.status) {
			case 200:
				dispatch({
					type: Data.GET_BANDWIDTH,
					payload: {
						bandwidth: bandwidthResponse.data,
						bandwidthSum: bandwidthSumResponse.data,
					},
				});
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

export const getAudience_Action = (session_token: string, timeline: any) => {
	return async (dispatch: any) => {
		const audienceBody = {
			session_token,
			from: timeline.from,
			to: timeline.to,
		};
		const audienceResponse = await axios.post('/audience', audienceBody);
		switch (audienceResponse.status) {
			case 200:
				dispatch({
					type: Data.GET_AUDIENCE,
					payload: audienceResponse.data
				});
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











