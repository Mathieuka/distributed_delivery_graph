import React, { FC } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import OffloadChart from '../OffloadChart/OffloadChart';
import ConcurrentChart from '../ConcurrentChart/ConcurrentChart';
import './Dashboard.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dataSorting } from '../../helper/dataRules';

interface IDashboard {
    isAuth: boolean;
    cdnDate?: any[],
    cdnGbps?: any[],
    p2pGbps?: any[],
}

const Dashboard: FC<IDashboard> = ({ isAuth, cdnDate, cdnGbps, p2pGbps }) => {

    let dates_: any;
    let cdnGbps_: any;
    let p2pGbps_: any;
    
    if (cdnDate && cdnDate.length) {
        const { dates, cdnG, p2pG, datesSorted, cdnGbpsSorted, p2pGbpsSorted } = dataSorting(cdnDate, cdnGbps, p2pGbps);
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
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        cdnDate: state.dataReducer.cdn.date,
        cdnGbps: state.dataReducer.cdn.gbps,
        p2pGbps: state.dataReducer.p2p.gbps,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({

    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
