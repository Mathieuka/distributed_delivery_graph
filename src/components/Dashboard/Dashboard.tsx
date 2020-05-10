import React, { FC, useState, useEffect } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import './Dashboard.css';
import OffloadChart from '../OffloadChart/OffloadChart';
import ConcurrentChart from '../ConcurrentChart/ConcurrentChart';
import { isSmallScreenAction } from '../../redux/actions/screen_action';
import { logOutAction } from '../../redux/actions/auth_action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dataSorting } from '../../helper/dataRules';
import TimelinePicker from '../TimelinePicker/TimelinePicker';
import stockData from './stockData.json';

import {
	StockChart,
	ChartTitle,
	ChartSeries,
	ChartSeriesItem,
	ChartNavigator,
	ChartNavigatorSelect,
	ChartNavigatorSeries,
	ChartNavigatorSeriesItem
} from '@progress/kendo-react-charts';

interface IDashboard {
	isAuth: boolean;
	tokenSession: string;
	cdnDatesData?: string[];
	cdnGbpsData?: number[];
	p2pGbpsData?: number[];
	audiencesData: number[];
	completeDatesInStringForTheToolTip: string[];
	isSmallScreen: boolean;
	isSmallScreenAction: any;
	logOutAction: any;
}

const Dashboard: FC<IDashboard> = ({
	isAuth,
	tokenSession,
	cdnDatesData,
	cdnGbpsData,
	p2pGbpsData,
	isSmallScreenAction,
	isSmallScreen,
	audiencesData,
	completeDatesInStringForTheToolTip,
	logOutAction,
}) => {
	let dates_: any;
	let cdnGbps_: any;
	let p2pGbps_: any;
	let completeDateForTooltip: any;

	// update the number of data display in relation of the screen size
	window.addEventListener('resize', function () {
		if (window.innerWidth < 1320) {
			isSmallScreenAction(true);
		} else {
			isSmallScreenAction(false);
		}
	});

	// format data, in relation to the amount of information we want to display
	if (cdnDatesData && cdnDatesData.length) {
		const {
			originalChartData,
			cdnG,
			p2pG,
			completeDatesInStringForTheToolTip_,
			datesSorted,
			cdnGbpsSorted,
			p2pGbpsSorted,
			completeDatesInStringForTheToolTipSorted,
		} = dataSorting(cdnDatesData, cdnGbpsData, p2pGbpsData, isSmallScreen, completeDatesInStringForTheToolTip);
		dates_ = originalChartData ? originalChartData : datesSorted;
		cdnGbps_ = cdnG ? cdnG : cdnGbpsSorted;
		p2pGbps_ = p2pG ? p2pG : p2pGbpsSorted;
		completeDateForTooltip = completeDatesInStringForTheToolTip_ ? completeDatesInStringForTheToolTip : completeDatesInStringForTheToolTipSorted;
	}

	const logout = (e: any) => {
		e.preventDefault();
		logOutAction(tokenSession);
		window.location.replace('https://streamroot.io/');
	};



	const from = new Date('2009/02/05');
	const to = new Date('2011/10/07');

	return (
		<div>
			{isAuth ? (
			<div>
				<div className="buttonContainer">
					<button onClick={(e) => logout(e)} className="logout">
						Logout
						</button>
				</div>
				<OffloadChart
					cdnDatesData={dates_ ? dates_ : []}
					cdnGbpsData={cdnGbps_ ? cdnGbps_ : []}
					p2pGbpsData={p2pGbps_ ? p2pGbps_ : []}
					completeDateForTooltip={completeDateForTooltip ? completeDateForTooltip : []}
				/>
				<ConcurrentChart audiencesData={audiencesData ? audiencesData : []} />
				<TimelinePicker
					cdnDatesData={dates_ ? dates_ : []}
					p2pGbpsData={p2pGbps_ ? p2pGbps_ : []}
				/>
				<hr/>
				<hr/>
				
				{/*  just an specific component for Timeline */}
				<div>
					<StockChart>
						<ChartTitle text="Just an example of a component I could have implemented for handling the `Timeline component`  in a concrete project" />
						<ChartSeries>
							<ChartSeriesItem
								data={stockData}
								type="candlestick"
								openField="Open"
								closeField="Close"
								lowField="Low"
								highField="High"
								categoryField="Date"
							/>
						</ChartSeries>
						<ChartNavigator>
							<ChartNavigatorSelect from={from} to={to} />
							<ChartNavigatorSeries>
								<ChartNavigatorSeriesItem
									data={stockData}
									type="area"
									field="Close"
									categoryField="Date"
								/>
							</ChartNavigatorSeries>
						</ChartNavigator>
					</StockChart>
				</div>
			</div>
			) : (
				<div>No Authenticated</div>
			)}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		cdnDatesData: state.dataReducer.cdn.date,
		cdnGbpsData: state.dataReducer.cdn.gbps,
		p2pGbpsData: state.dataReducer.p2p.gbps,
		audiencesData: state.dataReducer.audience?.audiences,
		isSmallScreen: state.screenReducer.isSmallScreen,
		completeDatesInStringForTheToolTip: state.dataReducer.dates,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			isSmallScreenAction,
			logOutAction,
		},
		dispatch
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
