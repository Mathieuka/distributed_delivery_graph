import React, { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TimelinePicker = (props: any) => {
    const minimumFrom = new Date('Wed Apr 22 2020 16:59:58 GMT+0200');
    const maximumTo = new Date();
    const [from, setFrom] = useState(minimumFrom);
    const [to, setTo] = useState(maximumTo);

    // handle min and max date for 'From' & 'To'
    const handleMinAndMaxDate = (e: Date | null, set: (args: any) => void) => {
        if (e && Date.parse(e.toString()) < Date.parse('Wed Apr 22 2020 16:59:58 GMT+0200')) {
            console.log('to low !')
            set(minimumFrom);
        } else if (e && Date.parse(e.toString()) > Date.parse(new Date().toString())) {
            set(maximumTo);
        } else if (e) {
            set(e);
        }
    }

    const handleFrom = (e: Date | null, set: (args: any) => void) => {
        handleMinAndMaxDate(e, set);
    }

    const handleTo = (e: Date | null, set: (args: any) => void) => {
        handleMinAndMaxDate(e, set);
    }

    console.log('from => ', from);
    console.log('to => ', to);

    return (
        <div>
            <DatePicker
                selected={from}
                onChange={(e) => handleFrom(e, setFrom)}
            />
            <DatePicker
                selected={to}
                onChange={(e) => handleTo(e, setTo)}
            />
        </div>
    );
}

export default TimelinePicker


