import React, { FC, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import './TimelinePicker.css';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	getBandwidth_Action,
	getAudience_Action,
} from '../../redux/actions/data_action';
import { convertHumanDateToUnixTimestamp } from '../../helper/converter';

interface ITimelinePicker {
    tokenSession: string;
    cdnDatesData: any;
    p2pGbpsData: any;
    getBandwidth_Action: any;
    getAudience_Action: any;
}

const TimelinePicker: FC<ITimelinePicker> = ({ tokenSession, cdnDatesData, p2pGbpsData, getBandwidth_Action, getAudience_Action  }) => {

    const minimumFrom = new Date('Wed Apr 22 2020 16:59:58 GMT+0200');
    const maximumTo = new Date();
    maximumTo.setDate(maximumTo.getDate() - 1)
    const [from, setFrom] = useState(minimumFrom);
    const [to, setTo] = useState(maximumTo);
    
    useEffect(() => {
        timelineRequest(
            tokenSession,
            { year: 2020, month: 4, day: 22 },
            { year: to.getFullYear(), month: to.getMonth() + 1, day: to.getDate() - 1 }
        )
    }, []);

    useEffect(() => {
        timelineRequest(
            tokenSession,
            {
                year: from.getFullYear(),
                month: from.getMonth() + 1,
                day: from.getDate(),
            },
            { year: to.getFullYear(), month: to.getMonth() + 1, day: to.getDate() }
        )

        if (Date.parse(from.toString()) > Date.parse(to.toString())) {
            alert("hey buddy ! Is  not Possible ^^'")
            setFrom(minimumFrom);
            setTo(maximumTo);
        }
    }, [from, to]);

    // handle timeline
	const timelineRequest = (
		tokenSession: string,
		from: { year: number; month: number; day: number },
		to: { year: number; month: number; day: number }
	) => {
		getBandwidth_Action(
			tokenSession,
			convertHumanDateToUnixTimestamp(
				{ year: from.year, month: from.month, day: from.day },
				{ year: to.year, month: to.month, day: to.day }
			)
		);

		getAudience_Action(
			tokenSession,
			convertHumanDateToUnixTimestamp(
				{ year: from.year, month: from.month, day: from.day },
				{ year: to.year, month: to.month, day: to.day }
			)
		);
	};


    const handleMinAndMaxOfDatePickerTimeline = (
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
        handleMinAndMaxOfDatePickerTimeline(e, set);
    };

    const handleTo = (e: Date | null, set: (args: any) => void) => {
        handleMinAndMaxOfDatePickerTimeline(e, set);
    };

    return (
        <div className='timeline'>
            <div className='datePicker'>
                <div className='datePicker__input'>
                    <DatePicker selected={from} onChange={(e) => handleFrom(e, setFrom)} />
                </div>
                <div className='datePicker__input'>
                    <DatePicker selected={to} onChange={(e) => handleTo(e, setTo)} />
                </div>
            </div>
            <div className='chart'>
                <Chart >
                    <ChartArea margin={50} height={250} background='#3fcb7e' />
                    <ChartTitle />
                    <ChartValueAxis>
                        <ChartValueAxisItem min={0} max={500} />
                    </ChartValueAxis>
                    <ChartCategoryAxis >
                        <ChartCategoryAxisItem majorGridLines={{ visible: false }} categories={cdnDatesData} />
                    </ChartCategoryAxis>
                    <ChartSeries >
                        <ChartSeriesItem tooltip={{ visible: true }} style={"smooth"} opacity={0.5} color='#1d7d36' dashType="solid" type="area" data={p2pGbpsData} />
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

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			getAudience_Action,
			getBandwidth_Action,
		},
		dispatch
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(TimelinePicker);
