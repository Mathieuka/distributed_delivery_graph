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

interface IDashboard {
	isAuth: boolean;
	tokenSession: any;
	cdnDate?: string[];
	cdnGbps?: number[];
	p2pGbps?: number[];
	timelineRequest: any;
	isSmallScreenAction: any;
	isSmallScreen: boolean;
	audiences: number[];
	datesToolTip: string[];
	logOutAction: any;
}

const Dashboard: FC<IDashboard> = ({
	isAuth,
	tokenSession,
	cdnDate,
	cdnGbps,
	p2pGbps,
	timelineRequest,
	isSmallScreenAction,
	isSmallScreen,
	audiences,
	datesToolTip,
	logOutAction,
}) => {
	let dates_: any;
	let cdnGbps_: any;
	let p2pGbps_: any;
	let datesToolTip_: any;

	// update the number of data display in relation of the screen size
	window.addEventListener('resize', function () {
		if (window.innerWidth < 1320) {
			isSmallScreenAction(true);
		} else {
			isSmallScreenAction(false);
		}
	});

	// format data, in relation to the amount of information we want to display
	if (cdnDate && cdnDate.length) {
		const {
			dates,
			cdnG,
			p2pG,
			datesToolT,
			datesSorted,
			cdnGbpsSorted,
			p2pGbpsSorted,
			datesToolTipSorted,
		} = dataSorting(cdnDate, cdnGbps, p2pGbps, isSmallScreen, datesToolTip);
		dates_ = dates ? dates : datesSorted;
		cdnGbps_ = cdnG ? cdnG : cdnGbpsSorted;
		p2pGbps_ = p2pG ? p2pG : p2pGbpsSorted;
		datesToolTip_ = datesToolT ? datesToolTip : datesToolTipSorted;
	}

	const logout = (e: any) => {
		e.preventDefault();
		logOutAction(tokenSession);
		window.location.replace('https://streamroot.io/');
	};

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
						cdnDate={dates_ ? dates_ : []}
						cdnGbps={cdnGbps_ ? cdnGbps_ : []}
						p2pGbps={p2pGbps_ ? p2pGbps_ : []}
						dates={datesToolTip_ ? datesToolTip_ : []}
					/>
					<ConcurrentChart audiences={audiences ? audiences : []} />
					<TimelinePicker
						timelineRequest={timelineRequest}
						cdnDate={dates_ ? dates_ : []}
						p2pGbps={p2pGbps_ ? p2pGbps_ : []}
					/>
				</div>
			) : (
				<div>No Authenticated</div>
			)}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		cdnDate: state.dataReducer.cdn.date,
		cdnGbps: state.dataReducer.cdn.gbps,
		p2pGbps: state.dataReducer.p2p.gbps,
		audiences: state.dataReducer.audience?.audiences,
		isSmallScreen: state.screenReducer.isSmallScreen,
		datesToolTip: state.dataReducer.dates,
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
