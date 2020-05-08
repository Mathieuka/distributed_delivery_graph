import { Data } from '../actions/type';
import {
	convertUnixDateToHumanDate,
    convertBytesToGbps,
} from '../../helper/formatData';

interface IInitialState {
	cdn: {
		date: null;
		gbps: null;
	};
	p2p: {
		date: null;
		gbps: null;
	};
}

interface IAction {
	type: Data;
	payload: {
		bandwidth: any;
		bandwidthSum: any;
	};
}

const initialState: IInitialState = {
	cdn: {
		date: null,
		gbps: null
	},
	p2p: {
		date: null,
		gbps: null
	},
};

export const dataReducer = (state = initialState, action: IAction) => {
	switch (action.type) {
		case Data.GET_BANDWIDTH:
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
				bandwidthSum: {
                    cdn: convertBytesToGbps(action.payload.bandwidthSum.cdn),
                    p2p: convertBytesToGbps(action.payload.bandwidthSum.p2p),
                } 
			};
		default:
			return state;
	}
};
