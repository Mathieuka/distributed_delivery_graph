import { Data } from './type';
import axios from '../../axios';

export const getBandwidth_Action = (session_token: string, timeline: any) => {
	console.log('getBandwidth_Action Dispatched !!')
	return async (dispatch: any) => {
		// console.log('timeline => ', timeline)
		
		const bandwidthBody = {
			session_token,
			from: timeline.from,
			to: timeline.to,
		};
		const bandwidthResponse = await axios.post('/bandwidth', bandwidthBody);
		console.log('RESPONSE => ', bandwidthResponse)
		const bandwidthSumBody = {
			session_token,
			from: timeline.from,
			to: timeline.to,
			aggregate: 'sum',
		};
		const bandwidthSumResponse = await axios.post('/bandwidth', bandwidthSumBody);

		dispatch({
			type: Data.GET_BANDWIDTH,
			payload: {
				bandwidth: bandwidthResponse.data,
				bandwidthSum: bandwidthSumResponse.data,
			},
		});
		// switch (response.status) {
		// 	case 200:
		// 		dispatch({ type: Data.GET_BANDWIDTH, payload: bandwidthResponse.data });
		// 		break;
		// 	case 500:
		// 		throw new Error('Error:: Server Error');
		// 	case 404:
		// 		throw new Error('Error:: Not Found');
		// 	case 403:
		// 		throw new Error('Error:: forbidden');
		// 	default:
		// 		break;
		// }
	};
};
