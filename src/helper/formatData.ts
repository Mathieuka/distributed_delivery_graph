// Date formatting
export const convertUnixDateToHumanDate = (unixTimestamps: any) => {
    
    const humanDateFormatting = (unix_timestamp: any) => {
		var date = new Date(unix_timestamp).toString().split(' ');
		return date[2] + '.' + date[1];
    };
    
	const humanDates = unixTimestamps.map((timestamps: any) => {
		return humanDateFormatting(timestamps[0]);
	});
	return humanDates;
};



// bytes formatting
export const convertBytesToGbps = (bytes: any, decimals = 2) => {
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	if (bytes.length) {
		const gbps = bytes.map((el: any) => {
			if (el[1] === 0) return '0 Bytes';
			const i = Math.floor(Math.log(el[1]) / Math.log(k));
			return parseFloat((el[1] / Math.pow(k, i)).toFixed(dm));
		});
		return gbps;
	}

	// special case for sum, here bytes is not an array
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
};
