import React, { FC, useEffect } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import OffloadChart from '../OffloadChart/OffloadChart';
import ConcurrentChart from '../ConcurrentChart/ConcurrentChart';
import './Dashboard.css';
import { isSmallScreenAction } from '../../redux/actions/screen_action';
import { convertHumanDateToUnixTimestamp } from '../../helper/dateConverter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dataSorting } from '../../helper/dataRules';
import TimelinePicker from '../TimelinePicker/TimelinePicker';


interface IDashboard {
    isAuth: boolean;
    tokenSession: any;
    cdnDate?: any[];
    cdnGbps?: any[];
    p2pGbps?: any[];
    timelineRequest: any;
    isSmallScreenAction: any;
    isSmallScreen: any;
}

const Dashboard: FC<IDashboard> = ({ isAuth, tokenSession, cdnDate, cdnGbps, p2pGbps, timelineRequest, isSmallScreenAction, isSmallScreen }) => {

    let dates_: any;
    let cdnGbps_: any;
    let p2pGbps_: any;
    

    // update the number of data display in relation of the screen size
    window.addEventListener("resize", function () {    
        if (window.innerWidth < 1320) {
            isSmallScreenAction(true);
        } else {
            isSmallScreenAction(false);
        }
    });

    if (cdnDate && cdnDate.length) {
        const { dates, cdnG, p2pG, datesSorted, cdnGbpsSorted, p2pGbpsSorted } = dataSorting(cdnDate, cdnGbps, p2pGbps,isSmallScreen);
        dates_ = dates ? dates : datesSorted;
        cdnGbps_ = cdnG ? cdnG : cdnGbpsSorted;
        p2pGbps_ = p2pG ? p2pG : p2pGbpsSorted;
    }

    return (
        <div>
            {/* {
                isAuth ?
                    (<OffloadChart bandwidth={bandwidth} bandwidthSum={bandwidthSum} />)
                    :
                    <div>No Authenticated for display OffloadChart</div>
            }
            {
                isAuth ?
                    (<ConcurrentChart />)
                    :
                    <div>No Authenticated for display ConcurrentChart</div>
            } */}
            <OffloadChart  cdnDate={dates_ ? dates_ : []} cdnGbps={cdnGbps_ ? cdnGbps_ : []} p2pGbps={p2pGbps_ ? p2pGbps_ : []}/>
            <ConcurrentChart cdnDate={dates_ ? dates_ : []} p2pGbps={p2pGbps_ ? p2pGbps_ : []}/>
            <TimelinePicker timelineRequest={timelineRequest} cdnDate={dates_ ? dates_ : []} p2pGbps={p2pGbps_ ? p2pGbps_ : []}/>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        cdnDate: state.dataReducer.cdn.date,
        cdnGbps: state.dataReducer.cdn.gbps,
        p2pGbps: state.dataReducer.p2p.gbps,
        isSmallScreen: state.screenReducer.isSmallScreen
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        isSmallScreenAction
    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
