import { Data } from '../actions/type';
import {
	convertUnixDateToHumanDate,
	convertBytesToGbps,
} from '../../helper/converter';

const days: string[] = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'thursday',
	'Friday',
	'Saturday',
	'Sunday',
];
const months: string[] = [
	'January',
	'Febuary',
	'March',
	' April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

interface IInitialState {
	cdn: {
		date: null;
		gbps: null;
	};
	p2p: {
		date: null;
		gbps: null;
	};
	audience: null;
}

interface IActionBandwidth {
	type: Data;
	payload: {
		bandwidth: any;
		bandwidthSum: any;
	};
}

interface IActionAudience {
	type: Data;
	payload: any;
}

type IAction = IActionBandwidth | IActionAudience;

const initialState: IInitialState = {
	cdn: {
		date: null,
		gbps: null,
	},
	p2p: {
		date: null,
		gbps: null,
	},
	audience: null,
};

export const dataReducer = (state = initialState, action: IAction) => {
	switch (action.type) {
		case Data.GET_BANDWIDTH:
			const dates = action.payload.bandwidth.cdn.map((elements: number[]) => {
				const [unixDate] = elements;
				const formattedDate: Date = new Date(unixDate);
				const day: string = days[formattedDate.getDay()];
				const month: string = months[formattedDate.getMonth()];
				const date: string = formattedDate.getDate().toString();
				const year: string = formattedDate.getFullYear().toString();
				return `${day}, ${month} ${date}, ${year} ${formattedDate.toLocaleTimeString(
					'en-US'
				)}`;
			});
			return {
				...state,
				cdn: {
					date: [...convertUnixDateToHumanDate(action.payload.bandwidth.cdn)],
					gbps: [...convertBytesToGbps(action.payload.bandwidth.cdn)],
				},
				p2p: {
					date: [...convertUnixDateToHumanDate(action.payload.bandwidth.p2p)],
					gbps: [...convertBytesToGbps(action.payload.bandwidth.p2p)],
				},
				// bandwidthSum: {
				// 	cdn: convertBytesToGbps(action.payload.bandwidthSum.cdn),
				// 	p2p: convertBytesToGbps(action.payload.bandwidthSum.p2p),
				// },
				dates,
			};
		case Data.GET_AUDIENCE:
			const { audience } = action.payload;
			let audiences = audience.map((element: number[]) => element[1]);
			return {
				...state,
				audience: {
					audiences,
				},
			};
		default:
			return state;
	}
};
