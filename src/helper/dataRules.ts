let datesSorted;

const resultGreaterThen35AndLessThen81 = (
	dates: string[],
	cdnGbps: any,
	p2pGbps: any,
	isSmallScreen?: boolean
) => {
	const memoize: any = {};
	let cdnGbpsSorted: any = [];
	let p2pGbpsSorted: any = [];
	datesSorted = dates
		.map((date, index) => {

			if (!memoize[date]) {
				memoize[date] = 1;
			} else {
				memoize[date] = memoize[date] + 1;
			}
			
			if (isSmallScreen && memoize[date] <= 1) {				
				if (cdnGbps && p2pGbps) {
					cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
					p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
				}
				return date;
			}



			if (!isSmallScreen && index % 2 === 0) {
				if (cdnGbps && p2pGbps) {
					cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
					p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
				}

				return date;
			}
		})
		.filter((val) => val !== undefined);
	return {
		datesSorted,
		cdnGbpsSorted,
		p2pGbpsSorted,
	};
};

const resultGreaterThen88 = (dates: string[], cdnGbps: any, p2pGbps: any, isSmallScreen?: boolean) => {
	let cdnGbpsSorted: any = [];
	let p2pGbpsSorted: any = [];
	const memoize: any = {};
	datesSorted = dates
		.map((val: any, index: any) => {
			if (!memoize[val]) {
				memoize[val] = 1;
			} else {
				memoize[val] = memoize[val] + 1;
			}
			
			if (isSmallScreen && memoize[val] <= 1) {
				console.log('yes')
				if (cdnGbps && p2pGbps) {
					cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
					p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
				}
				return val;
			}

			if (!isSmallScreen) {
				// case date.length is greater then 200 we display 2 same days max
				if (dates.length > 200 && memoize[val] <= 2) {
					if (cdnGbps && p2pGbps) {
						cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
						p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
					}
					return val;
				}
				
				// case date.length is less then 200 we display 4 same days max
				if (dates.length < 200 && memoize[val] <= 4) {
					if (cdnGbps && p2pGbps) {
						cdnGbpsSorted = [...cdnGbpsSorted, cdnGbps[index]];
						p2pGbpsSorted = [...p2pGbpsSorted, p2pGbps[index]];
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
	};
};

export const dataSorting = (dates: any[], cdnG?: any, p2pG?: any, isSmallScreen?: boolean): {datesSorted: any, cdnGbpsSorted:any, p2pGbpsSorted:any} | any => {
	if (dates && dates.length > 30 && dates.length <= 81) {
		return resultGreaterThen35AndLessThen81(dates, cdnG, p2pG, isSmallScreen);
	}

	if (dates && dates.length > 88) {
		return resultGreaterThen88(dates, cdnG, p2pG, isSmallScreen);
	}
	return {
        dates,
        cdnG,
        p2pG
    }
};
