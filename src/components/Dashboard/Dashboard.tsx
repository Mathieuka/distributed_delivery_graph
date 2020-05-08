import React, { FC } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import OffloadChart from '../OffloadChart/OffloadChart';
import ConcurrentChart from '../ConcurrentChart/ConcurrentChart';
import './Dashboard.css';

interface IDashboard {
    isAuth: boolean;
}

const Dashboard: FC<IDashboard> = ({ isAuth }) => {

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
            <OffloadChart  />
            <ConcurrentChart />
        </div>
    );
}


export default Dashboard;