import React, { FC, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

interface ITimelinePicker {
    timelineRequest: any;
    tokenSession?: string;
}

const TimelinePicker: FC<ITimelinePicker> = ({ timelineRequest, tokenSession }) => {

    useEffect(() => {
        timelineRequest(
            tokenSession,
            { year: 2020, month: 4, day: 22 },
            { year: to.getFullYear(), month: to.getMonth() + 1, day: to.getDate() }
        )
    },[])

    const minimumFrom = new Date('Wed Apr 22 2020 16:59:58 GMT+0200');
    const maximumTo = new Date();
    const [from, setFrom] = useState(minimumFrom);
    const [to, setTo] = useState(maximumTo);

    const handleMinAndMaxDatePickerTimeline = (
        e: Date | null,
        set: (args: any) => void
    ) => {
        if (
            e &&
            Date.parse(e.toString()) < Date.parse('Wed Apr 22 2020 16:59:58 GMT+0200')
        ) {
            alert('OoPs Buddy! No data before this date');
            set(minimumFrom);
        } else if (
            e &&
            Date.parse(e.toString()) > Date.parse(new Date().toString())
        ) {
            alert('OoPs Buddy! No data after this date');
            set(maximumTo);
        } else if (e) {
            set(e);
        }
    };

    const handleFrom = (e: Date | null, set: (args: any) => void) => {
        handleMinAndMaxDatePickerTimeline(e, set);
        handleTimeline()
    };

    const handleTo = (e: Date | null, set: (args: any) => void) => {
        handleMinAndMaxDatePickerTimeline(e, set);
        handleTimeline()
    };

    const handleTimeline = () => {
        timelineRequest(
            tokenSession,
            {
                year: from.getFullYear(),
                month: from.getMonth() + 1,
                day: from.getDate(),
            },
            { year: to.getFullYear(), month: to.getMonth() + 1, day: to.getDate() }
        )
    }
    return (
        <div>
            <DatePicker selected={from} onChange={(e) => handleFrom(e, setFrom)} />
            <DatePicker selected={to} onChange={(e) => handleTo(e, setTo)} />
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tokenSession: state.authReducer.tokenSession,
    };
};


export default connect(mapStateToProps, null)(TimelinePicker);
