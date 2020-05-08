import React, { FC, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartArea,
} from '@progress/kendo-react-charts';
import './TimelinePicker.css';

interface ITimelinePicker {
    timelineRequest: any;
    tokenSession?: string;
    cdnDate: any;
    p2pGbps: any;
}

const TimelinePicker: FC<ITimelinePicker> = ({ timelineRequest, tokenSession, cdnDate, p2pGbps }) => {

    const minimumFrom = new Date('Wed Apr 22 2020 16:59:58 GMT+0200');
    const maximumTo = new Date();
    const [from, setFrom] = useState(minimumFrom);
    const [to, setTo] = useState(maximumTo);

    useEffect(() => {
        
        timelineRequest(
            tokenSession,
            { year: 2020, month: 4, day: 22 },
            { year: to.getFullYear(), month: to.getMonth() + 1, day: to.getDate() }
        )
    }, [])

    useEffect(() => {
        if (Date.parse(from.toString()) > Date.parse(to.toString())) {
            alert("hey buddy ! Is  not Possible ^^'")
            setFrom(minimumFrom);
            setTo(maximumTo);
        }
    }, [from, to]);



    const handleMinAndMaxDatePickerTimeline = (
        e: Date | null,
        set: (args: any) => void
    ) => {
        if (e && Date.parse(e.toString()) < Date.parse('Wed Apr 22 2020 16:59:58 GMT+0200')) {
            alert(`OoPs Buddy! No data before this date ^^'`);
            set(minimumFrom);
        } else if (e && Date.parse(e.toString()) > Date.parse(new Date().toString())) {
            alert(`OoPs Buddy! No data after this date ^^'`);
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
        <div className='timeline'>
            <div className='datePicker'>
                <div className='datePicker__input'>
                    <DatePicker selected={from} onChange={(e) => handleFrom(e, setFrom)} />
                </div>
                <div className='datePicker__input'>
                    <DatePicker  selected={to} onChange={(e) => handleTo(e, setTo)} />
                </div>
            </div>
            <div className='chart'>
                <Chart onSeriesClick={(e) => console.log('click')} >
                    <ChartArea margin={100} height={150} background='#a6edb9' />
                    <ChartTitle text="CONCURRENT VIEWERS" />
                    <ChartValueAxis>
                        <ChartValueAxisItem title={{ text: "??" }} min={0} max={500} />
                    </ChartValueAxis>
                    <ChartCategoryAxis >
                        <ChartCategoryAxisItem majorGridLines={{ visible: false }} categories={cdnDate} />
                    </ChartCategoryAxis>
                    <ChartSeries >
                        <ChartSeriesItem  tooltip={{ visible: true }} style={"smooth"} opacity={0.5} color='#1d7d36' dashType="solid" type="area" data={p2pGbps} />
                    </ChartSeries>
                </Chart >
            </div>

        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tokenSession: state.authReducer.tokenSession,
    };
};


export default connect(mapStateToProps, null)(TimelinePicker);
