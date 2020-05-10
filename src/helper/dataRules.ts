// The principal rules here "the number of elements displayed" is tested with TDD method.
// Just run: npm run test
let datesSorted;
const resultGreaterThen35AndLessThen81 = (
	originalChartData: string[],
	cdnGbps: number[],
	p2pGbps: number[],
	isSmallScreen?: boolean,
	datesToolTip?: string[]
) => {
	const memoize: any = {};
	let cdnGbpsSorted: number[] = [];
	let p2pGbpsSorted: number[] = [];
	let completeDatesInStringForTheToolTipSorted: string[] = [];
	datesSorted = originalChartData
		.map((date, index) => {
			if (!memoize[date]) {
				memoize[date] = 1;
			} else {
				memoize[date] = memoize[date] + 1;
			}

			if (isSmallScreen && memoize[date] <= 1) {
				if (cdnGbps && p2pGbps && datesToolTip) {
					cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
					p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
					completeDatesInStringForTheToolTipSorted = [...completeDatesInStringForTheToolTipSorted, datesToolTip[index]];
				}
				return date;
			}

			if (!isSmallScreen && index % 2 === 0) {
				if (cdnGbps && p2pGbps && datesToolTip) {
					cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
					p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
					completeDatesInStringForTheToolTipSorted = [...completeDatesInStringForTheToolTipSorted, datesToolTip[index]];
				}

				return date;
			}
		})
		.filter((val) => val !== undefined);
	return {
		datesSorted,
		cdnGbpsSorted,
		p2pGbpsSorted,
		completeDatesInStringForTheToolTipSorted
	};
};

const resultGreaterThen88 = (
	originalChartData: string[],
	cdnGbps: number[],
	p2pGbps: number[],
	isSmallScreen?: boolean,
	datesToolTip?: string[]
) => {
	let cdnGbpsSorted: number[] = [];
	let p2pGbpsSorted: number[] = [];
	let completeDatesInStringForTheToolTipSorted: string[] = []; 
	const memoize: any = {};
	datesSorted = originalChartData
		.map((val: string, index: number) => {
			if (!memoize[val]) {
				memoize[val] = 1;
			} else {
				memoize[val] = memoize[val] + 1;
			}

			if (isSmallScreen && memoize[val] <= 1) {				
				if (cdnGbps && p2pGbps && datesToolTip) {
					cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
					p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
					completeDatesInStringForTheToolTipSorted = [...completeDatesInStringForTheToolTipSorted, datesToolTip[index]];
				}
				return val;
			}

			if (!isSmallScreen) {
				// case date.length is greater then 200 we display 2 same days max
				if (originalChartData.length > 200 && memoize[val] <= 2) {
					if (cdnGbps && p2pGbps && datesToolTip) {
						cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
						p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
						completeDatesInStringForTheToolTipSorted = [...completeDatesInStringForTheToolTipSorted, datesToolTip[index]];
					}
					return val;
				}

				// case date.length is less then 200 we display 4 same days max
				if (originalChartData.length < 200 && memoize[val] <= 4) {
					if (cdnGbps && p2pGbps && datesToolTip) {
						cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
						p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
						completeDatesInStringForTheToolTipSorted = [...completeDatesInStringForTheToolTipSorted, datesToolTip[index]];
					}
					return val;
				}
			}
		})
		.filter((val: any) => val !== undefined);
	return {
		datesSorted,
		cdnGbpsSorted,
		p2pGbpsSorted,
		completeDatesInStringForTheToolTipSorted
	};
};

export const dataSorting = (
	originalChartData: string[],
	cdnG?: any,
	p2pG?: any,
	isSmallScreen?: boolean,
	completeDatesInStringForTheToolTip_?: string[]
): { datesSorted: any; cdnGbpsSorted: any; p2pGbpsSorted: any } | any => {
	if (originalChartData && originalChartData.length > 30 && originalChartData.length <= 81) {
		return resultGreaterThen35AndLessThen81(originalChartData, cdnG, p2pG, isSmallScreen, completeDatesInStringForTheToolTip_);
	}

	if (originalChartData && originalChartData.length > 88) {
		return resultGreaterThen88(originalChartData, cdnG, p2pG, isSmallScreen, completeDatesInStringForTheToolTip_);
	}
	return {
		originalChartData,
		cdnG,
		p2pG,
		completeDatesInStringForTheToolTip_
	};
};
