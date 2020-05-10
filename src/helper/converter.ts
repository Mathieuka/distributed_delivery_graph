export const convertHumanDateToUnixTimestamp = (
	from: { year: number; month: number; day: number },
	to: { year: number; month: number; day: number }
): { from: number; to: number } => {
	const formatting = (timeStamp: number) => {
		const val = timeStamp.toString() + '000';
		const ts = parseInt(val, 10);
		return ts;
	};

	let toTStamp = new Date(
		Date.UTC(from.year, from.month - 1, from.day, 6, 0, 0)
	);
	let fromTStamp = new Date(Date.UTC(to.year, to.month - 1, to.day, 15, 0, 0));
	const temp = toTStamp.getTime() / 1000;
	const temp2 = fromTStamp.getTime() / 1000;
	return {
		from: formatting(temp),
		to: formatting(temp2),
	};
};

export const convertUnixDateToHumanDate = (unixTimestamps: number[]): string[] => {
	const humanDateFormatting = (unix_timestamp: number) => {
		var date = new Date(unix_timestamp).toString().split(' ');
		return date[2] + '.' + date[1];
	};

	const humanDates = unixTimestamps.map((timestamps: any) => {
		return humanDateFormatting(timestamps[0]);
	});
	return humanDates;
};

export const convertBytesToGbps = (bytes: any, decimals = 3): any[] | any => {
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	if (bytes.length) {
		const gigabytePerSecond = bytes.map((bytes: number[]) => {
			if (bytes[1] === 0) return '0 Bytes';
			const i = Math.floor(Math.log(bytes[1]) / Math.log(k));
			return parseFloat((bytes[1] / Math.pow(k, i)).toFixed(dm));
		});
		return gigabytePerSecond;
	}

	// special case for sum, here bytes is not an array
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
};
