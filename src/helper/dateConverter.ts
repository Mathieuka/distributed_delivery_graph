// timeline utils

const formatting = (timeStamp: number) => {
    const val = timeStamp.toString() + '000';
    const ts = parseInt(val, 10);
    return ts;
}

export const convertHumanDateToUnixTimestamp = (
	from : { year: any; month: any; day: any },
	to: { year: any; month: any; day: any }
) => {
	let toTStamp = new Date(Date.UTC(from.year, from.month - 1, from.day, 6, 0, 0));
    let fromTStamp = new Date(Date.UTC(to.year, to.month - 1, to.day, 15, 0, 0));
    const temp = toTStamp.getTime()/1000
    const temp2 = fromTStamp.getTime()/1000
	return {
        from: formatting(temp),
        to: formatting(temp2),
    };
};

